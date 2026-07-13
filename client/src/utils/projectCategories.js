const LEGACY_CATEGORY_LABELS = {
  'mobile-app': 'Mobile App',
  'html-css-js': 'HTML/CSS/JS',
  'frontend-reactjs': 'Frontend (ReactJS)',
  'fullstack-mern': 'Fullstack (MERN) Projects',
  'fullstack-sql': 'Full Stack SQL Projects',
  others: 'Others',
};

export const getCategoryLabel = (value) => LEGACY_CATEGORY_LABELS[value] || value;
