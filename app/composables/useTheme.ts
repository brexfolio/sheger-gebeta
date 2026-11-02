export const useTheme = () => {
  const currentTheme = useState<'dark' | 'light'>('sheger-theme', () => 'dark')
  const isTransitioning = useState<boolean>('sheger-theme-transitioning', () => false)

  const isDark = computed(() => currentTheme.value === 'dark')

  const setTheme = (theme: 'dark' | 'light') => {
    currentTheme.value = theme
    if (import.meta.client) {
      const favicon = document.getElementById('appFavicon') as HTMLLinkElement | null

      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
        document.body.setAttribute('data-theme', 'dark')
        if (favicon) favicon.href = '/assets/favicon-dark.svg'
        try {
          localStorage.setItem('sheger_theme', 'dark')
        } catch (_) {}
      } else {
        document.documentElement.removeAttribute('data-theme')
        document.body.removeAttribute('data-theme')
        if (favicon) favicon.href = '/assets/favicon-light.svg'
        try {
          localStorage.setItem('sheger_theme', 'light')
        } catch (_) {}
      }
    }
  }

  const runFallbackCircleTransition = (
    x: number,
    y: number,
    endRadius: number,
    targetTheme: 'dark' | 'light',
    onComplete?: () => void
  ) => {
    if (!import.meta.client) return

    const ripple = document.createElement('div')
    ripple.className = 'theme-circle-ripple'
    ripple.style.position = 'fixed'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = '12px'
    ripple.style.height = '12px'
    ripple.style.borderRadius = '50%'
    ripple.style.pointerEvents = 'none'
    ripple.style.zIndex = '999999'
    ripple.style.transform = 'translate(-50%, -50%) scale(1)'
    ripple.style.backgroundColor = targetTheme === 'dark' ? '#08070A' : '#f0ebe4'
    ripple.style.boxShadow =
      targetTheme === 'dark'
        ? '0 0 50px 25px rgba(86, 9, 8, 0.7), inset 0 0 25px rgba(0, 0, 0, 0.8)'
        : '0 0 50px 25px rgba(248, 244, 236, 0.85), inset 0 0 25px rgba(255, 255, 255, 0.9)'
    ripple.style.transition = 'transform 0.85s cubic-bezier(0.25, 1, 0.3, 1), opacity 0.35s ease'

    document.body.appendChild(ripple)

    const targetScale = (endRadius / 6) * 1.08

    requestAnimationFrame(() => {
      ripple.style.transform = `translate(-50%, -50%) scale(${targetScale})`
    })

    setTimeout(() => {
      setTheme(targetTheme)
    }, 480)

    setTimeout(() => {
      ripple.style.opacity = '0'
      setTimeout(() => {
        ripple.remove()
        if (onComplete) onComplete()
      }, 350)
    }, 850)
  }

  const toggleTheme = (originElement?: HTMLElement | null) => {
    if (!import.meta.client) return
    if (isTransitioning.value) return
    isTransitioning.value = true

    const nextTheme: 'dark' | 'light' = isDark.value ? 'light' : 'dark'

    // Calculate origin center coordinates
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    if (originElement) {
      const rect = originElement.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }

    // Radius needed to reach the farthest corner of the viewport
    const endRadius =
      Math.ceil(
        Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        )
      ) + 20

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setTheme(nextTheme)
      isTransitioning.value = false
      return
    }

    // Fallback if View Transitions API is not supported
    if (!document.startViewTransition) {
      runFallbackCircleTransition(x, y, endRadius, nextTheme, () => {
        isTransitioning.value = false
      })
      return
    }

    // Set CSS custom properties for View Transition keyframes
    document.documentElement.style.setProperty('--reveal-x', `${x}px`)
    document.documentElement.style.setProperty('--reveal-y', `${y}px`)
    document.documentElement.style.setProperty('--reveal-radius', `${endRadius}px`)

    // Disable intra-element transitions during snapshot capture
    document.documentElement.classList.add('in-view-transition')

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme)
    })

    transition.ready
      .then(() => {
        document.documentElement.classList.remove('in-view-transition')

        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]

        try {
          document.documentElement.animate(
            { clipPath },
            {
              duration: 850,
              easing: 'cubic-bezier(0.25, 1, 0.3, 1)',
              pseudoElement: '::view-transition-new(root)'
            }
          )
        } catch (_) {
          // CSS @keyframes circleReveal provides fallback
        }
      })
      .catch(() => {
        document.documentElement.classList.remove('in-view-transition')
      })

    transition.finished.finally(() => {
      document.documentElement.classList.remove('in-view-transition')
      isTransitioning.value = false
    })
  }

  // Initialize theme on client mount
  const initTheme = () => {
    if (!import.meta.client) return
    try {
      const saved = localStorage.getItem('sheger_theme')
      if (saved === 'light') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
    } catch (_) {
      setTheme('dark')
    }

    // Remove transition suppression once initial layout paints
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.classList.remove('preload-transitions')
      }, 50)
    })
  }

  return {
    currentTheme,
    isDark,
    setTheme,
    toggleTheme,
    initTheme
  }
}

