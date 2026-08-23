interface ToolCategoryProps {
  category: string;
}

export default function ToolCategory({ category }: ToolCategoryProps) {
  return (
    <p className="ig-eyebrow" style={{ textAlign: "center" }}>
      {category}
    </p>
  );
}
