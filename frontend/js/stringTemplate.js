export class StringTemplate {
  constructor(template) {
    this.template = template;
  }

  fill(data) {
    let template = String(this.template);

    const matches = template.matchAll(/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}\}/g);

    matches.forEach(([full, key]) => {
      const value = data[key];
      if (value) {
        template = template.replace(full, value);
      }
    });

    return template;
  }
}
