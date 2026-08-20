import { inspirationPageDefaults } from './defaults'
import {
  inspirationCategories,
  inspirationColors,
  inspirationDesignStyles,
  inspirationSortOptions,
} from './defaults'
import { inspirationModelsIntro } from './inspirationDetailDefaults'

/** Default field values for the Inspiration Page global in Payload admin. */
export const inspirationPageCmsFieldDefaults = {
  hero: {
    title: inspirationPageDefaults.hero.title,
    description: inspirationPageDefaults.hero.description,
  },
  searchPlaceholder: inspirationPageDefaults.searchPlaceholder,
  allSpacesLabel: inspirationPageDefaults.allSpacesLabel,
  modelsIntro: inspirationModelsIntro,
  categories: inspirationCategories.map((value) => ({ value })),
  designStyles: inspirationDesignStyles.map((value) => ({ value })),
  colors: inspirationColors.map((value) => ({ value })),
  sortOptions: inspirationSortOptions.map((value) => ({ value })),
  seo: inspirationPageDefaults.seo,
}
