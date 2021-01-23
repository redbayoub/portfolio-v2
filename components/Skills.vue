<template>
  <div class="skills">
    <section class="container">
      <h1 class="section-title">{{ $t("skills.title") }}</h1>
      <div class="section-content skill-cards-wrapper">
        <SkillCard
          :key="index"
          v-for="(skill, index) in skills"
          class="skill-card"
          :svg="skill.svg"
          :title="getSkillTitle(skill)"
          :content="skill.content"
          :iconFill="skill.iconFill"
        />
      </div>
    </section>
  </div>
</template>

<script>
import SkillCard from "@/components/SkillCard";
export default {
  name: "skills",
  components: {
    SkillCard,
  },
  data() {
    return {
      skills: [
        {
          svg: "phone",
          title_en: "Mobile Development",
          title_ar: "تطوير تطبيقات الهواتف",
          content: "Flutter: Android, IOS",
          iconFill: "#9FC037",
        },
        {
          svg: "serverIcon",
          title_en: "Back-end Development",
          title_ar: "تطوير المواقع (Back-end)",
          content: "PHP, Laravel, Firebase",
          iconFill: "#7377AD",
        },
        {
          svg: "jsIcon",
          title_en: "Front-end Development",
          title_ar: "تطوير المواقع (Front-end)",
          content: "HTML5, CSS, JavaScript, VueJS",
          iconFill: "#EFD81D",
        },
        {
          svg: "databaseIcon",
          title_en: "Databases",
          title_ar: "قواعد البيانات",
          content: "MySQL, Firestore",
          iconFill: "#005E86",
        },
        {
          svg: "codeForkIcon",
          title_en: "Version Control",
          title_ar: "نظم التحكم في النسخ",
          content: "Git, Github",
          iconFill: "#24292E",
        },
        {
          svg: "laptopIcon",
          title_en: "Desktop Development (obsolete)",
          title_ar: "تطوير برامج الحاسوب (قديم)",
          content: "Java, JavaFX",
          iconFill: "#636363",
        },
      ],
    };
  },
  methods: {
    getSkillTitle: function (skill) {
      return this.$i18n.locale == "ar" ? skill.title_ar : skill.title_en;
    },
  },
};
</script>

<style>

html[lang="ar"] .skills {
  direction: rtl;
}

.skill-cards-wrapper {
  --auto-grid-min-size: 16rem;

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
  );
  grid-gap: 1.8em;
 
  justify-items: center;
}
</style>