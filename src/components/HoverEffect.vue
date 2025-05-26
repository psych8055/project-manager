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
      <div class="active-tags">
        <span
          v-for="(tag, index) in selectedTags"
          :key="index"
          class="tag-pill"
        >
          {{ tag }}
          <button @click="removeTag(tag)">✖</button>
        </span>
      </div>


        <li class="list__item header">
          <span class="list__item-col hover-effect hover-effect--bg projectName">Project Name</span>
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
          <span class="list__item-col hover-effect hover-effect--bg collaborators">Collaborators</span>
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
          <span class="list__item-col hover-effect hover-effect--bg live">
            <span v-if="project.is_live" class="text-green-500">✔️</span>
            <span v-else class="text-red-500">❌</span>
          </span>
          <span class="list__item-col hover-effect hover-effect--bg year">{{ project.year }}</span>
          <span class="list__item-col hover-effect hover-effect--bg collaborators"> {{project.collaborators[0]}}</span>
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
import '../assets/css/base.css'
import '../assets/js/index.js'
import '../assets/js/utils.js'
import { createTextAnimator } from '@/assets/js/text-animator.js'
import { data as projectData } from '../assets/js/data.js'

const animators = new Map()

const projects = ref(projectData.data)
const selectedYear = ref('')
const selectedTag = ref('')

const availableYears = [...new Set(projectData.data.map(p => p.year))]
const availableTags = [...new Set(projectData.data.flatMap(p => p.tags))]

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
  width: 30%;
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
.collaborators{
  width: 10%;
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
.header{
  margin-top: 48px;
  align-items: center;
}
.active-tags{
  position: absolute;
  left: 5%;
  top: 0;
}
.tag-pill {
  background: #f0f0f0;
  color: #333;
  padding: 0.1rem 0.8rem;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.tag-pill button:active {
  border: none;
  outline: none;
}
.tag-pill button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #555;
}

select {
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 16px;
  padding: 0.5rem 1.8rem 0.5rem 0.5rem;
  ner-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.3s ease;
  margin-top: 4px;
  text-transform: capitalize;
}

select:hover {
  border-color: #999;
}

select:focus {
  border-color: #000;
}

option {
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 16px;
  text-transform: capitalize;
}
.custom-select {
  position: relative;
  display: inline-block;
}

.custom-select::after {
  content: '▼';
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
}

</style>
