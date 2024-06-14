"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Item } from '../../../types/Items' // Importe a interface Item do arquivo onde ela está definida

interface Props {
  itemId: number;
  onClose: () => void;
}

const EditItemIframe: React.FC<Props> = ({ itemId, onClose }) => {
  const [itemDetails, setItemDetails] = useState<Item | null>(null);
  const [itemName, setItemName] = useState<string>('');
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the item details to pre-fill the form
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`https://buyeer-backend.onrender.com/api/items/${itemId}`);
        const item = response.data;
        setItemDetails(item);
        setItemName(item.name);
        setItemQuantity(item.quantity);
      } catch (err) {
        console.error('Erro ao buscar detalhes do item:', err);
        setError('Erro ao buscar detalhes do item');
      }
    };

    if (itemId) {
      fetchItemDetails();
    }
  }, [itemId]);

  const handleUpdateItem = async () => {
    try {
      setLoading(true);
      const updatedItem = {
        name: itemName !== '' ? itemName : itemDetails?.name,
        quantity: itemQuantity
      };
      const response = await axios.put(`https://buyeer-backend.onrender.com/api/items/${itemId}`, updatedItem);
      console.log('Item atualizado com sucesso:', response.data);
      setSuccessMessage('Item atualizado com sucesso');
      setError(null);
      setLoading(false);
      setTimeout(onClose, 1500); // Close the modal after 1.5 seconds
    } catch (err) {
      console.error('Erro ao atualizar item:', err);
      setError('Erro ao atualizar item');
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    setItemQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setItemQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="iframe-container p-4 bg-[#0C0C0D] rounded-lg">
      <h1 className="text-[#FBF9FE] text-center mb-4"><strong>Editar Item</strong></h1>
      <div className="flex flex-col items-center p-2">
        <label className='text-[#FBF9FE] text-center mb-4'>Novo nome do produto</label>
        <input 
          type="text" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
          className="input-field w-full p-2 mb-4 border border-[#252529] rounded-lg bg-[#252529] text-white" 
        />
      </div>
      <div className="flex flex-col items-center p-2">
        <label className='text-[#FBF9FE] text-center mb-4'>Nova quantidade</label>
        <div className="flex items-center mb-4">
          <button onClick={handleDecrement} className="px-2 py-1 rounded-l text-[#AFABB6] hover:text-[#FBF9FE]">
            -
          </button>
          <input 
            type="number" 
            value={itemQuantity} 
            className="input-field w-16 text-center bg-[#252529] border border-b-gray-800 text-white" 
            readOnly 
          />
          <button onClick={handleIncrement} className="px-2 py-1 rounded-r text-[#AFABB6] hover:text-[#FBF9FE]">
            +
          </button>
        </div>
        <button 
          onClick={handleUpdateItem} 
          className="bg-[#7DF9FF] text-[#0C0C0D] px-4 py-2 rounded hover:bg-[#7393B3] hover:text-white transition-colors"
          disabled={loading}
        >
          {loading ? 'Atualizando...' : 'Atualizar Item'}
        </button>
        {error && <p className='text-red-600 mt-4'>{error}</p>}
        {successMessage && <p className='text-green-600 mt-4'>{successMessage}</p>}
      </div>
    </div>
  );
}

export default EditItemIframe;
