function kebabToPascalCase(str: string): string {
  return str
    .split("-") // 先按 - 拆分
    .filter(Boolean) // 去掉空项（防止出现 --）
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

// 匹配./component/*/index.tsx中的组件名
export const getName = (
  path: string,
  type: "templates" | "components",
  target: "index" | "meta"
) => {
  const regexp = new RegExp(`\./${type}/(.*)/${target}\.tsx`);
  const result = regexp.exec(path);
  if (result && result.length > 1) {
    const componentName = result[1];
    return kebabToPascalCase(componentName);
  }
  throw new Error("Cannot identify component name");
};
