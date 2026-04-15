<template>
  <!-- the whole navbar -->
  <div class="flex flex-row justify-between items-center mt-1 relative py-4">
    <!-- Zerya logo -->
    <img src="~/assets/logo.svg" alt="Zerya logo" class="h-[52px] w-[108px] mx-15">

    <!-- main links container -->
    <div
      class="relative flex flex-row justify-around h-10 px-3 items-center bg-[#262626] rounded-full
     before:absolute before:block before:bg-blue-500 before:rounded-full before:h-10 before:w-20 before:top-0"
    >
      <!-- the main links -->
      <div class="text-xs m-4 font-medium z-2">
        Home
      </div>
      <div class="text-xs m-4 font-medium z-2">
        About Us
      </div>
      <div class="text-xs m-4 font-medium z-2">
        Services
      </div>
      <div class="text-xs m-4 font-medium z-2">
        Case Studies
      </div>
      <div class="text-xs m-4 font-medium z-2">
        Career
      </div>
    </div>

    <!-- Contact us button -->
    <div class="text-sm mx-15">
      Contact Us
    </div>
  </div>
</template>
