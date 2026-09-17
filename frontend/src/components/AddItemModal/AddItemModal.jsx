import { useState } from "react";
import "../../styles/AddItemModal.css";

function AddItemModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    produto: "",
    quantidade: "",
    unidade_medida: "",
  });

  const unidadesMedida = [
    { value: "un", label: "un" },
    { value: "m", label: "m" },
    { value: "kg", label: "kg" },
    { value: "l", label: "L" },
    { value: "cx", label: "cx" },
    { value: "pct", label: "pct" },
    { value: "par", label: "par" },
    { value: "rolo", label: "rolo" },
    { value: "barra", label: "barra" },
    { value: "saco", label: "saco" },
  ];

  if (!isOpen) return null;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Dados do formulário:", formData);
  }

  return (
    <div className="add-item-overlay" onClick={onClose}>
      <div
        className="add-item-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <h2>Adicionar item</h2>

        <form onSubmit={handleSubmit}>
          {/* Produto */}
          <div className="add-item-field">
            <label htmlFor="produto">Produto</label>

            <input
              id="produto"
              name="produto"
              type="text"
              value={formData.produto}
              onChange={handleChange}
              placeholder="Digite o nome do produto"
              autoFocus
              required
            />
          </div>

          {/* Quantidade e Unidade */}
          <div className="quantity-unit-group">
            <div className="add-item-field quantity-field">
              <label htmlFor="quantidade">Quantidade</label>

              <input
                id="quantidade"
                name="quantidade"
                type="number"
                value={formData.quantidade}
                onChange={handleChange}
                placeholder="Quantidade"
                min="1"
                required
              />
            </div>

            <div className="add-item-field unit-field">
              <label htmlFor="unidade_medida">Unidade</label>

              <select
                id="unidade_medida"
                name="unidade_medida"
                value={formData.unidade_medida}
                onChange={handleChange}
              >
                <option value="">—</option>

                {unidadesMedida.map((unidade) => (
                  <option key={unidade.value} value={unidade.value}>
                    {unidade.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botões */}
          <div className="add-item-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button type="submit" className="add-confirm-button">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;