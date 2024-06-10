// createItemIframe.tsx

import React, { useState } from 'react';

const CreateItemIframe: React.FC = () => {
  const [quantities, setQuantities] = useState([1]);

  const handleIncrement = (index: number) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const handleDecrement = (index: number) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  const handleAdd = () => {
    // Lógica para adicionar item
    console.log("Adicionar item");
  };

  return (
    <div className="iframe-container">
      <h1 className="text-[#FBF9FE] text-center mb-4"><strong>Adicione um Produto</strong></h1>
      <div className="flex flex-col items-center p-10">
        <h1 className='text-[#FBF9FE] text-center mb-4'>Nome do produto</h1>
        <input 
          type="text" 
          placeholder="Produto" 
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
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1) {
                  setQuantities(prevQuantities => {
                    const newQuantities = [...prevQuantities];
                    newQuantities[index] = value;
                    return newQuantities;
                  });
                }
              }}
            />
            <button onClick={() => handleIncrement(index)} className="px-2 py-1 rounded-r">
              +
            </button>
          </div>
        ))} 
        <button onClick={handleAdd} className="bg-[#7DF9FF] text-[#0C0C0D] px-4 py-2 rounded mt-4 hover:bg-[#7393B3] hover:text-white transition-colors">
          Adicionar Item
        </button>
      </div>
    </div>
  );
}

export default CreateItemIframe;
