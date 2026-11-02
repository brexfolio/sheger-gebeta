<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
const toggleRef = ref<HTMLButtonElement | null>(null)

const handleToggle = () => {
  toggleTheme(toggleRef.value)
}
</script>

<template>
  <button
    ref="toggleRef"
    class="celestial-theme-toggle"
    id="celestialToggle"
    :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    type="button"
    @click="handleToggle"
  >
    <!-- Sun with radiating dots (Light Mode) -->
    <svg
      class="sun-sparkle"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="#7A1216"
      stroke-width="1.8"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path
        d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke-linecap="round"
      />
    </svg>

    <!-- Crescent Moon (Dark Mode) -->
    <svg
      class="moon-crescent"
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="#E88E8B"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

