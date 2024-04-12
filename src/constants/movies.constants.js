const MOVIES_IMPORT_PROPERTIES = {
  TITLE: 'title',
  YEAR: 'year',
  FORMAT: 'format',
  ACTORS: 'actors',
};

const MOVIES_ORDER_PROPERTY = {
  ID: 'id',
  TITLE: 'title',
  YEAR: 'year',
};

module.exports = {
  MOVIES_MIN_YEAR: 1900,
  MOVIES_MAX_YEAR: new Date().getFullYear(),

  MOVIES_ACTORS_ARRAY_MIN_LENGTH: 1,
  MOVIES_ACTORS_ARRAY_MAX_LENGTH: 20,

  MOVIES_ACCEPTED_FORMATS: ['VHS', 'DVD', 'Blu-Ray'],

  MOVIES_IMPORT_PROPERTIES,

  MOVIES_IMPORT_LABEL_TO_PROPERTY_MAP: {
    Title: MOVIES_IMPORT_PROPERTIES.TITLE,
    'Release Year': MOVIES_IMPORT_PROPERTIES.YEAR,
    Format: MOVIES_IMPORT_PROPERTIES.FORMAT,
    Stars: MOVIES_IMPORT_PROPERTIES.ACTORS,
  },

  MOVIES_TITLE_MIN_LENGTH: 2,
  MOVIES_TITLE_MAX_LENGTH: 64,
  MOVIES_ACTOR_NAME_MIN_LENGTH: 2,
  MOVIES_ACTOR_NAME_MAX_LENGTH: 64,
  MOVIES_SEARCH_MIN_LENGTH: 2,
  MOVIES_SEARCH_MAX_LENGTH: 64,

  MOVIES_ACTOR_NAME_REGEX: new RegExp(
    /^[а-яіїa-z]+(?:-[а-яіїa-z]+)*(?:,? [а-яіїa-z]+(?:-[а-яіїa-z]+)*)*$/,
    'i',
  ),

  MOVIES_ORDER_PROPERTY,

  MOVIES_ORDER_PROPERTY_DEFAULT: MOVIES_ORDER_PROPERTY.ID,

  MOVIES_ORDER_AVAILABLE_PROPERTIES: [
    MOVIES_ORDER_PROPERTY.ID,
    MOVIES_ORDER_PROPERTY.TITLE,
    MOVIES_ORDER_PROPERTY.YEAR,
  ],

  MOVIES_VALIDATION_ERRORS: {
    ACTOR_NAME_INVALID:
      // eslint-disable-next-line max-len
      'actor\'s name can contain only latin, cyrillic, "," (only after word) and "-" (only between other characters) symbols',
  },
};
