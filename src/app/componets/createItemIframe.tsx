"use client"
import axios from 'axios';
import React, { useState } from 'react';

const CreateItemIframe: React.FC = () => {
  const [itemName, setItemName] = useState<string>('');
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddItem = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://buyeer-backend.onrender.com/api/items', {
        name: itemName,
        quantity: itemQuantity,
      });
      console.log('Item adicionado com sucesso:', response.data);
      setItemName('');
      setItemQuantity(1); // Reset quantity after successful addition
      setSuccessMessage('Item adicionado com sucesso');
      setError(null);
    } catch (err) {
      console.error('Erro ao adicionar item:', err);
      setError('Erro ao adicionar item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="iframe-container">
      <h1 className="text-[#FBF9FE] text-center mb-4"><strong>Adicione um Produto</strong></h1>
      <div className="flex flex-col items-center p-10">
        <h1 className='text-[#FBF9FE] text-center mb-4'>Nome do produto</h1>
        <input 
          type="text" 
          placeholder="Produto" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
          className="input-field mt-20 w-[200px] h-[30px] p-[5px] border-radius-[5px] border border-[#252529] rounded-lg bg-[#252529]" 
        />
      </div>
      <div className="flex flex-col items-center p-10">
        <h1 className='text-[#FBF9FE] text-center mb-4'>Quantidade</h1>
        <div className="flex items-center mb-4">
          <button onClick={() => setItemQuantity(itemQuantity > 1 ? itemQuantity - 1 : 1)} className="px-2 py-1 rounded-l">
            -
          </button>
          <input 
            type="number" 
            value={itemQuantity} 
            className="input-field w-16 text-center bg-[#252529] border border-b-gray-800" 
            readOnly 
          />
          <button onClick={() => setItemQuantity(itemQuantity + 1)} className="px-2 py-1 rounded-r">
            +
          </button>
        </div>
        <button 
          onClick={handleAddItem} 
          className="bg-[#7DF9FF] text-[#0C0C0D] px-4 py-2 rounded mt-4 hover:bg-[#7393B3] hover:text-white transition-colors"
          disabled={loading}
        >
          {loading ? 'Adicionando...' : 'Adicionar Item'}
        </button>
        {error && <p className='text-red-600 mt-4'>{error}</p>}
        {successMessage && <p className='text-green-600 mt-4'>{successMessage}</p>}
      </div>
    </div>
  );
};

export default CreateItemIframe;
