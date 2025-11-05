import React, { useState, useRef, useEffect } from "react";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items = [] }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Botão do menu */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        {label}
      </button>

      {/* Itens do menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-200 z-50">
          <ul className="py-1">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => {
                    item.onClick();
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
