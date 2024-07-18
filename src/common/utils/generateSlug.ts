export const generateSlug = (str: string): string => {
  str = str.trim().toLowerCase();
  // Remove accents, special characters
  str = str.replace(/[^\w\s-]/g, '');
  // Replace spaces with hyphens
  str = str.replace(/\s+/g, '-');
  // Remove leading/trailing hyphens
  return str.replace(/-+/g, '-');
};
