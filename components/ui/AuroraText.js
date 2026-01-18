"use client";

export function AuroraText({ className, children, ...props }) {
    return (
        <span
            className={`relative inline-block text-transparent bg-clip-text bg-[linear-gradient(90deg,#FFEB3B_0%,#FFFFFF_25%,#FFC107_50%,#FFFFFF_75%,#FFEB3B_100%)] bg-[length:200%_auto] animate-aurora py-4 px-4 ${className || ""}`}
            {...props}
        >
            {children}
        </span>
    );
}
