<!-- src/components/HoverEffect.vue -->
<template>
  <main>
    <header class="frame visible-h">
      <h1 class="frame__title hover-effect hover-effect--bg">
        <a class="hover-effect hover-effect--bg" href="#">#Hover</a>
        Animations on Line
        <a class="hover-effect hover-effect--bg" href="#">#Typography</a>
      </h1>
      <a class="frame__back hover-effect hover-effect--bg" href="#">Article</a>
      <a class="frame__archive hover-effect hover-effect--bg" href="#">All demos</a>
      <a class="frame__github hover-effect hover-effect--bg" href="#">GitHub</a>
      <nav class="frame__demos">
        <span>Variations:</span>
        <a class="hover-effect hover-effect--bg" href="#">V1</a>
        <span>V2</span>
        <a class="hover-effect hover-effect--bg" href="#">V3</a>
        <a class="hover-effect hover-effect--bg" href="#">V4</a>
      </nav>
    </header>

    <section class="content mt-">
      <h2 class="content__title">Project Palette</h2>
      <ul class="list list--bg list--bg-west">
        <!-- <div class="filters" style="margin-bottom: 1rem; display: flex; gap: 1rem;">
        <label>
          Year:
          <select v-model="selectedYear">
            <option value="">All</option>
            <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
          </select>
        </label>

        <label>
          Tag:
          <select v-model="selectedTag">
            <option value="">All</option>
            <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </label>
      </div> -->

        <li class="list__item header">
          <span class="list__item-col hover-effect hover-effect--bg projectName">Project Name</span>
          <!-- <span class="list__item-col hover-effect hover-effect--bg ClientName">{{ project.client_name }}</span> -->
          <span class="list__item-col hover-effect hover-effect--bg live">
            Live
          </span>
          <span class="list__item-col hover-effect hover-effect--bg year">
            <label>
              Year:
              <select v-model="selectedYear">
                <option value="">All</option>
                <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
              </select>
            </label>
          </span>
          <span class="list__item-col hover-effect hover-effect--bg tags">
            <label>
              Tag:
              <select v-model="selectedTag">
                <option value="">All</option>
                <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
              </select>
            </label>
          </span>
        </li>
        <li
          v-for="(project) in filteredProjects"
          :key="project.id"
          class="list__item"
          @mouseenter="animate"
          @mouseleave="animateBack"
        >
          <a class="projectName" :href="project.url" target="_blank">
            <span class="list__item-col hover-effect hover-effect--bg">{{ project.project_name }}</span>
          </a>
          <!-- <span class="list__item-col hover-effect hover-effect--bg ClientName">{{ project.client_name }}</span> -->
          <span class="list__item-col hover-effect hover-effect--bg live">
            <span v-if="project.is_live" class="text-green-500">✔️</span>
            <span v-else class="text-red-500">❌</span>
          </span>
          <span class="list__item-col hover-effect hover-effect--bg year">{{ project.year }}</span>
          <span class="list__item-col hover-effect hover-effect--bg tags">{{ project.tags.join(', ') }}</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { TextSplitter } from '../assets/js/textSplitter.js'
import { gsap } from 'gsap'
import SplitType from 'split-type'
// import any extra files you need:
import '../assets/css/base.css'
import '../assets/js/index.js'
import '../assets/js/utils.js'
import { createTextAnimator } from '@/assets/js/text-animator.js'

import { data as projectData } from '../assets/js/data.js'

// const projects = projectData.data

const animators = new Map()

const projects = ref(projectData.data)
const selectedYear = ref('')
const selectedTag = ref('')

// Extract unique years and tags
const availableYears = [...new Set(projectData.data.map(p => p.year))]
const availableTags = [...new Set(projectData.data.flatMap(p => p.tags))]

// Computed projects based on filters
const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchesYear = selectedYear.value ? project.year === selectedYear.value : true
    const matchesTag = selectedTag.value ? project.tags.includes(selectedTag.value) : true
    return matchesYear && matchesTag
  })
})


function animate(e) {
  const el = e.currentTarget
  const spans = el.querySelectorAll('span')

  spans.forEach(span => {
    if (!animators.has(span)) {
      animators.set(span, new createTextAnimator(span))
    }
    animators.get(span).animate()
  })
}

function animateBack(e) {
  const el = e.currentTarget
  const spans = el.querySelectorAll('span')

  spans.forEach(span => {
    if (animators.has(span)) {
      animators.get(span).animateBack()
    }
  })
}

function animateOnHover(el) {
  // Create instance, splitting by characters
  const splitter = new TextSplitter(el, { splitTypeTypes: 'chars' })

  // Animate characters from y=100% to y=0%
  gsap.fromTo(chars, { yPercent: 100 }, {
    yPercent: 0,
    stagger: 0.03, // ok, within one span
    duration: 0.6,
    ease: 'power2.out'
  })
}

</script>

<style scoped>
/* Optionally override styles here if needed */
.hover-effect span {
  display: inline-block;
  overflow: hidden;
}
.list__item-col, .projectName{
  text-align: start;
}
.projectName{
  width: 40%;
}
.ClientName{
  width: 30%;
}
.year{
  width: 10%;
}
.live{
  width: 5%;
}
.tags{
  width:auto;
}
.visible-h{
  visibility: hidden;
}
.mt-{
  margin-top: -15vh;
}
</style>
