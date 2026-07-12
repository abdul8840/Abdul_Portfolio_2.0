export const PROJECT_CATEGORIES = [
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'html-css-js', label: 'HTML/CSS/JS' },
  { value: 'frontend-reactjs', label: 'Frontend (ReactJS)' },
  { value: 'fullstack-mern', label: 'Fullstack (MERN) Projects' },
  { value: 'fullstack-sql', label: 'Full Stack SQL Projects' },
  { value: 'others', label: 'Others' },
];

export const getCategoryLabel = (value) =>
  PROJECT_CATEGORIES.find((category) => category.value === value)?.label ||
  value;
