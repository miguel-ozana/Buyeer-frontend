import axios from 'axios';
import React, { useState } from 'react';

const CreateItemIframe: React.FC = () => {
  const [quantities, setQuantities] = useState<number[]>([1]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Adicionado estado para mensagem de sucesso
  const [itemName, setItemName] = useState<string>('');
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  const handleIncrement = (index: number) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
    setItemQuantity(itemQuantity + 1);
  };

  const handleDecrement = (index: number) => {
    if (quantities[index] > 1) {
      setQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] -= 1;
        return newQuantities;
      });
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('https://buyeer-backend.onrender.com/api/items', {
        name: itemName,
        quantity: itemQuantity
      });
      console.log('Item adicionado com sucesso:', response.data);
      setItemName('');
      setQuantities([1]);
      setSuccessMessage('Item adicionado com sucesso');
      setError(null);
    } catch (err) {
      console.error('Erro ao adicionar item:', err);
      setError('Erro ao adicionar item');
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
        {quantities.map((quantity, index) => (
          <div key={index} className="flex items-center mb-4">
            <button onClick={() => handleDecrement(index)} className="px-2 py-1 rounded-l">
              -
            </button>
            <input 
              type="number" 
              value={quantity} 
              className="input-field w-16 text-center bg-[#252529] border border-b-gray-800" 
              readOnly 
            />
            <button onClick={() => handleIncrement(index)} className="px-2 py-1 rounded-r">
              +
            </button>
          </div>
        ))} 
        <button onClick={handleAddItem} className="bg-[#7DF9FF] text-[#0C0C0D] px-4 py-2 rounded mt-4 hover:bg-[#7393B3] hover:text-white transition-colors">
          Adicionar Item
        </button>
        {error && <p className='text-red-600'>{error}</p>}
        {successMessage && <p className='text-green-600'>{successMessage}</p>}
      </div>
    </div>
  );
}

export default CreateItemIframe;
