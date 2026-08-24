import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HTML CSS JS Formatter — Free Online Code Beautifier",
    description:
        "Format and beautify HTML, CSS, and JavaScript code online for free. Fast, browser-based, no upload required.",
};

export default function FormatterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}