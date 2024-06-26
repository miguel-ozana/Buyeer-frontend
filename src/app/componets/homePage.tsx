"use client"
import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { Trash2, Edit, CheckSquare, Square } from "react-feather";
import EditItemIframe from "./editItemIframe";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { setCookie, getCookie } from "../../../utils/cookies"; // Utilize as funções utilitárias para cookies



export interface Item {
  id: number;
  name: string;
  quantity: number;
  bought: boolean;
}

const HomePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(getCookie("deviceId")); // Recupera o deviceId do cookie

  useEffect(() => {
    if (!deviceId) {
      const id = generateDeviceId(); // Gere um novo deviceId se não estiver presente
      setDeviceId(id);
      setCookie("deviceId", id); // Armazene o deviceId em um cookie para persistência
    }
  }, [deviceId]);

  const generateDeviceId = (): string => {
    // Lógica para gerar um novo deviceId
    return "generated-device-id"; // Substitua com sua lógica real de geração de deviceId
  };

  const fetchItems = useCallback(async () => {
    if (!deviceId) return;

    try {
      const response = await axios.get<Item[]>(
        "https://buyeer-backend.onrender.com/api/items",
        {
          headers: {
            "x-device-id": deviceId,
          },
        }
      );
      setItems(response.data);
      setLoading(false);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        // Trata-se de um erro do Axios
        if (error.response) {
          console.error("Erro ao buscar os itens:", error.response.data);
        } else if (error.request) {
          console.error("Erro de requisição:", error.request);
        } else {
          console.error("Erro:", error.message);
        }
      } else {
        // Outros tipos de erro
        console.error("Erro desconhecido:", error);
      }
      setLoading(false);
    }
  }, [deviceId]);

  function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
  }

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(
        `https://buyeer-backend.onrender.com/api/items/${id}`,
        {
          headers: {
            "x-device-id": deviceId!,
          },
        }
      );
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const toggleBought = async (id: number, bought: boolean) => {
    try {
      await axios.put(
        `https://buyeer-backend.onrender.com/api/items/${id}`,
        {
          bought: !bought,
        },
        {
          headers: {
            "x-device-id": deviceId!,
          },
        }
      );
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, bought: !bought } : item
        )
      );
    } catch (error) {
      console.error("Erro ao marcar o item como comprado:", error);
    }
  };

  const handleEditItem = (id: number) => {
    setEditItemId(id);
  };

  const handleCloseEditItem = () => {
    setEditItemId(null);
    fetchItems(); // Atualiza os itens após editar
  };

  useEffect(() => {
    if (deviceId) {
      fetchItems();
    }
  }, [deviceId, fetchItems]);

  return (
    <div className="home-page relative">
      <h1 className="text-[#FBF9FE] text-3xl mb-8">Lista de Itens</h1>
      {loading ? (
        <p className="text-[#FBF9FE]">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-[#AFABB6]">
          Comece a adicionar seus itens para aparecerem aqui
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-[#252529] rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <span
                  className={`text-lg font-bold ${
                    item.bought ? "text-gray-300 line-through" : "text-white"
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-sm text-gray-400 ml-2">
                  ({item.quantity} unidades)
                </span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => toggleBought(item.id, item.bought)}
                  className="text-green-500 hover:text-green-400 mr-2 ml-2"
                >
                  {item.bought ? (
                    <CheckSquare size={20} />
                  ) : (
                    <Square size={20} />
                  )}
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-500 hover:text-red-400 mr-2"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={() => handleEditItem(item.id)}
                  className="text-blue-500 hover:text-blue-400"
                >
                  <Edit size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editItemId !== null && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-[#0C0C0D] rounded-lg shadow-lg w-11/12 max-w-3xl p-8">
            <button
              onClick={handleCloseEditItem}
              className="absolute top-2 right-2 rounded-full p-2 hover:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <EditItemIframe itemId={editItemId} onClose={handleCloseEditItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
