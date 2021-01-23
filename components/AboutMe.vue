<template>
  <div class="about-me bg-primary-light">
    <section class="container">
      <h1 class="section-title">{{ $t("about.title") }}</h1>
      <div class="section-content">
        <div class="image">
          <figure>
            <img class="avatar" src="/images/red_bayoub.jpg" alt="Red Bayoub Image" />
          </figure>
        </div>
        <div class="details">
          <p>{{ $t("about.p1") }}</p>
          <p>{{ $t("about.p2") }}</p>
          <br>
          <p>{{ $t("about.p3.title") }}</p>
          <ul>
            <li>{{ $t("about.p3.i1") }}</li>
            <li>{{ $t("about.p3.i2") }}</li>
            <li>{{ $t("about.p3.i3") }}</li>
            <li>{{ $t("about.p3.i4") }}</li>
          </ul>
          <p>{{ $t("about.p4") }}</p>
          <ul>
            <li>Dart & Flutter</li>
            <li>PHP & Laravel</li>
            <li>HTML & CSS & JavaSript & Bootstrap & VueJS</li>
          </ul>
          <p>{{ $t("about.p5") }}</p>
          <br>
          <p>{{ $t("about.p6") }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "aboutMe",
};
</script>

<style lang="scss">

html[lang="ar"] .about-me {
  direction: rtl;
}

.about-me img {
  display: block;
  margin: 0 auto 2em;
}

.about-me .details{
  line-height: 1.5em;
}


@media screen and (min-width: $md-brakepoint) {
  .about-me img {
    display: inline;
    margin-left: 2em;
  }

  .about-me .section-content {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
}

</style>