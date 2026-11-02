<script setup lang="ts">
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <main class="page-container">
    <!-- Mobile App Container Card -->
    <div class="card-wrapper" id="main-card">
      <!-- Top Left Ethiopian Food Platter Decoration -->
      <FoodPlateCorner />

      <!-- Interactive Celestial Theme Toggle (Sun ⇄ Moon) -->
      <CelestialThemeToggle />

      <!-- Top Right Skyline, Sun & Birds Artwork -->
      <SkylineArt />

      <!-- Main Content Container -->
      <div class="content-wrapper">
        <BrandHeader />
        <HeroSection />
        <LinkCards />
        <SocialFooter />
      </div>

      <!-- Traditional Ethiopian Geometric Pattern (Bottom Corners) -->
      <BottomPatterns />
    </div>
  </main>
</template>

