<template>
  <Card class="not-prose">
    <CardHeader>
      <CardTitle>
        <slot />
      </CardTitle>
      <CardDescription>
        <slot name="description" />
      </CardDescription>
    </CardHeader>
  </Card>
</template>
