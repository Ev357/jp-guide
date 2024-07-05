<script setup lang="ts">
const { t, locale } = useI18n();

useSeoMeta({
  title: t("APP_NAME"),
});

const {
  params: { slug },
} = useRoute();

const path = computed(() => {
  if (Array.isArray(slug)) {
    return `/${slug.join("/")}`;
  }

  return `/${slug}`;
});
</script>

<template>
  <ContentQuery :path find="one" :locale>
    <template #default="{ data }">
      <MaxWidthWrapper>
        <ContentRenderer :value="data" class="prose dark:prose-invert" />
      </MaxWidthWrapper>
    </template>
    <template #not-found>
      <Error404
        :status-message="$t('ERROR.NOT_FOUND')"
        :description="$t('ERROR.PAGE_NOT_FOUND_DESCRIPTION')"
        :back-message="$t('ERROR.BACK_HOME')"
        class="min-h-fit pt-24"
      />
    </template>
  </ContentQuery>
</template>
