import { BASE_URL } from '../config'

/**
 * page interface
 * <meta name='title' content="lorum ipsum" />
 */
/* 
const IPage = {
  title: {
    en: "",
    ar: "",
  },
  description: {
    en: "",
    ar: "",
  },
  keywords: {
    en: "",
    ar: "",
  },
  og: {
    title: {
      en: "",
      ar: "",
    },
    description: {
      en: "",
      ar: "",
    },
    image: {
      en: "",
      ar: "",
    },
    url: {
      en: "",
      ar: "",
    },
    site_name: {
      en: "",
      ar: "",
    },
  },
  twitter: {
    card: "summary_large_image",
    image: {
      alt: {
        en: "",
        ar: "",
      },
    },
  },
}; */
//TODO:  make sure all meta tags correct
const homeMeta = Object.freeze({
  title: {
    en: 'Red Bayoub | Software Developer',
    ar: 'Red Bayoub | مطور برامج',
  },
  description: {
    en:
      'Freelance software developer experienced in developing backend using Laravel and mobile apps using Flutter',
    ar:
      'مطور مستقل خبير في تصميم و برمجة تطبيقات الموبايل و مواقع الويب و  برامج الحواسيب',
  },
  keywords: {
    en:
      'freelancer , software , developer , websites , mobile , desktop , java , javascript , php , flutter , andorid , html',
    ar:
      'جافا , مواقع , php , java , javascript , php , flutter , andorid , html , ويب , تطبيقات , تطوير , جافاسكريبت , أندرويد , تصميم , فلاتر , برمجة , مطور , مبرمج',
  },
  og: {
    title: {
      en: 'Red Bayoub | Software Developer',
      ar: 'Red Bayoub | مطور برامج',
    },
    description: {
      en:
        'Freelance software developer experienced in developing backend using Laravel and mobile apps using Flutter',
      ar:
        'مطور مستقل خبير في تصميم و برمجة تطبيقات الموبايل و مواقع الويب و  برامج الحواسيب',
    },
    image: {
      en: BASE_URL + '/images/projects/personal-portfolio/v2/thumbnail.jpg',
      ar: BASE_URL + '/images/projects/personal-portfolio/v2/thumbnail.jpg',
    },
    url: {
      en: 'https://www.redbayoub.com/en',
      ar: 'https://www.redbayoub.com/ar',
    },
    site_name: {
      en: 'Red Bayoub | Portfolio',
      ar: 'Red Bayoub | الموقع الشخصي',
    },
  },
  twitter: {
    card: 'summary_large_image',
    image: {
      alt: {
        en: 'Red Bayoub | Portfolio',
        ar: 'Red Bayoub | الموقع الشخصي',
      },
    },
  },
})

//TODO: make sure all meta tags correct and add extra tags
const projectDetailsMeta = (project) => {
  return {
    title: {
      en: project.custom_title.en,
      ar: project.custom_title.ar,
    },
    description: {
      en: project.summery.en,
      ar: project.summery.ar,
    },
    og: {
      title: {
        en: project.custom_title.en,
        ar: project.custom_title.ar,
      },
      description: {
        en: project.summery.en,
        ar: project.summery.ar,
      },
      image: {
        en: BASE_URL + project.thumbnail_img,
        ar: BASE_URL + project.thumbnail_img,
      },
      url: {
        en: 'https://www.redbayoub.com/en/projects/' + project.slug,
        ar: 'https://www.redbayoub.com/ar/projects/' + project.slug,
      },
      site_name: {
        en: 'Red Bayoub | Portfolio',
        ar: 'Red Bayoub | الموقع الشخصي',
      },
    },
    twitter: {
      card: 'summary_large_image',
      image: {
        alt: {
          en: project.custom_title.en,
          ar: project.custom_title.ar,
        },
      },
    },
  }
}

export { homeMeta, projectDetailsMeta }
