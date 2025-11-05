import { useState, useRef, useEffect } from "react";
import type { Card as CardType } from "../types";
import {Eye,Edit,CreditCard,Calendar,Shield,DollarSign,MoreVertical,Copy,Trash2} from "lucide-react";

interface CardCardProps {
  card: CardType;
  onView: (card: CardType) => void;
  onEdit: (card: CardType) => void;
  onCopy?: (card: CardType) => void;
  onDelete?: (card: CardType) => void;
}

const statusConfig = {
  active: {
    label: "Ativo",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  inactive: {
    label: "Inativo",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export default function CardCard({
  card,
  onView,
  onEdit,
  onCopy,
  onDelete,
}: CardCardProps) {
  const statusInfo =
    statusConfig[card.status as keyof typeof statusConfig] || statusConfig.active;

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatCurrency = (value?: number) => {
    if (!value) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="group hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-gray-300/50 bg-white/50 backdrop-blur-sm rounded-xl p-6">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between mb-4 relative" ref={menuRef}>
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">
              {card.name}
            </h3>
            <p className="text-sm text-gray-500 font-mono">{card.number}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.className}`}
          >
            {statusInfo.label}
          </span>

          {/* Botão de menu simples */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
            >
              <MoreVertical className="h-4 w-4 text-gray-600" />
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <button
                      onClick={() => {
                        onView(card);
                        setOpenMenu(false);
                      }}
                      className="flex items-center w-full px-3 py-2 hover:bg-gray-100"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onEdit(card);
                        setOpenMenu(false);
                      }}
                      className="flex items-center w-full px-3 py-2 hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </button>
                  </li>
                  {onCopy && (
                    <li>
                      <button
                        onClick={() => {
                          onCopy(card);
                          setOpenMenu(false);
                        }}
                        className="flex items-center w-full px-3 py-2 hover:bg-gray-100"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </button>
                    </li>
                  )}
                  {onDelete && (
                    <li>
                      <button
                        onClick={() => {
                          onDelete(card);
                          setOpenMenu(false);
                        }}
                        className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Corpo */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium text-gray-600 mr-2">Validade:</span>
            <span className="text-gray-900">{card.validity || "Não informado"}</span>
          </div>

          <div className="flex items-center text-sm">
            <Shield className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium text-gray-600 mr-2">CVV:</span>
            <span className="text-gray-900 font-mono">{card.cvv || "***"}</span>
          </div>
        </div>

        <div className="flex items-center text-sm">
          <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-medium text-gray-600 mr-2">Limite:</span>
          <span className="text-gray-900 font-semibold">
            {formatCurrency(card.limit)}
          </span>
        </div>

        {card.obs && (
          <div className="text-sm">
            <span className="font-medium text-gray-600">Observações:</span>
            <p className="text-gray-700 mt-1 p-2 bg-gray-50 rounded-lg text-xs">
              {card.obs}
            </p>
          </div>
        )}
      </div>

      {/* Botões simples */}
      <div className="flex space-x-2">
        <button
          onClick={() => onView(card)}
          className="flex-1 bg-orange-600 text-white py-2 rounded-md flex items-center justify-center font-medium hover:bg-orange-700 transition-all"
        >
          <Eye className="h-4 w-4 mr-2" />
          Visualizar
        </button>

        <button
          onClick={() => onEdit(card)}
          className="flex-1 border border-gray-300 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-all"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </button>
      </div>
    </div>
  );
}
