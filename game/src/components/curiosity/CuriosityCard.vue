<script setup>
const props = defineProps(['animal']);
</script>

<template>
  <div class="flex flex-grow flex-row max-lg:justify-center">
    <div class="block p-6 rounded-lg shadow-lg border bg-white max-w-md">
      <h1 class="text-gray-900 text-xl text-center leading-tight font-medium mb-2">
        {{ animal.name }}
      </h1>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{
          'The ' +
          animal.name +
          ' is a ' +
          animal.characteristics.diet +
          ' belonging to the kingdom ' +
          animal.taxonomy.kingdom +
          '. ' +
          (animal.taxonomy.class && animal.taxonomy.order && animal.taxonomy.family
            ? ' It belongs to the class ' +
              animal.taxonomy.class +
              ' order ' +
              animal.taxonomy.order +
              ', family ' +
              animal.taxonomy.family +
              '. '
            : '') +
          (animal.characteristics.location && animal.characteristics.estimated_population_size
            ? ' It is native to ' +
              animal.characteristics.location +
              ' and its estimated population is ' +
              animal.characteristics.estimated_population_size +
              '. '
            : '') +
          (animal.characteristics.most_distinctive_feature
            ? animal.name +
              ' is known for its unique physical characteristic of ' +
              animal.characteristics.most_distinctive_feature +
              '. '
            : '') +
          (animal.characteristics.prey
            ? ' They primarily hunt ' + animal.characteristics.prey + '. '
            : '') +
          (animal.characteristics.lifestyle &&
          animal.characteristics.top_speed &&
          animal.characteristics.top_speed &&
          animal.characteristics.lifespan
            ? ' They are ' +
              animal.characteristics.lifestyle +
              ' and have a top speed of ' +
              animal.characteristics.top_speed +
              ' mph and a lifespan of ' +
              animal.characteristics.lifespan +
              '. '
            : '') +
          (animal.name +
            ' is threatened by' +
            animal.characteristics.biggest_threat +
            ', with ' +
            animal.characteristics.predators +
            ' being their natural predators and humans also posing a threat.')
        }}
      </p>
    </div>
  </div>
</template>
