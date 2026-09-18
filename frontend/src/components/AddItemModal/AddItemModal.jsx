import { useEffect, useState } from "react";
import "../../styles/AddItemModal.css";

function AddItemModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    produto: "",
    quantidade: "",
    unidade_medida: "",
    categoria_id: "",
    prioridade_id: "",
    fornecedor: "",
    referencia_produto: "",
    codigo_erp: "",
    solicitante_nome: "",
    observacoes: "",
  });

  //Trava o scroll enquanto o modal estiver aberto
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isOpen]);

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

  const categorias = [
    { value: "1", label: "Hidráulica" },
    { value: "2", label: "Elétrica" },
    { value: "3", label: "Eletrônicos" },
    { value: "4", label: "Tintas" },
    { value: "5", label: "EPIs" },
    { value: "6", label: "Ferragens" },
    { value: "7", label: "Utensílios" },
    { value: "8", label: "Ferramentas" },
    { value: "9", label: "Limpeza" },
    { value: "10", label: "Outros" },
  ];

  const prioridades = [
    { value: "1", label: "Alta" },
    { value: "2", label: "Média" },
    { value: "3", label: "Baixa" },
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
            <label htmlFor="produto">
              Produto
            </label>

            <input
              id="produto"
              name="produto"
              type="text"
              value={formData.produto}
              onChange={handleChange}
              placeholder="Digite o nome do produto"
              autoFocus
            />
          </div>


          {/* Quantidade e Unidade */}
          <div className="form-row">

            <div className="add-item-field">
              <label htmlFor="quantidade">
                Quantidade
              </label>

              <input
                id="quantidade"
                name="quantidade"
                type="number"
                value={formData.quantidade}
                onChange={handleChange}
                placeholder="Quantidade"
                min="1"
              />
            </div>

            <div className="add-item-field">
              <label htmlFor="unidade_medida">
                Unidade
              </label>

              <select
                id="unidade_medida"
                name="unidade_medida"
                value={formData.unidade_medida}
                onChange={handleChange}
              >
                <option value="">
                  —
                </option>

                {unidadesMedida.map((unidade) => (
                  <option
                    key={unidade.value}
                    value={unidade.value}
                  >
                    {unidade.label}
                  </option>
                ))}
              </select>
            </div>

          </div>


          {/* Categoria e Prioridade */}
          <div className="form-row">

            <div className="add-item-field">
              <label htmlFor="categoria_id">
                Categoria
              </label>

              <select
                id="categoria_id"
                name="categoria_id"
                value={formData.categoria_id}
                onChange={handleChange}
              >
                <option value="">
                  Selecione uma categoria
                </option>

                {categorias.map((categoria) => (
                  <option
                    key={categoria.value}
                    value={categoria.value}
                  >
                    {categoria.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="add-item-field">
              <label htmlFor="prioridade_id">
                Prioridade
              </label>

              <select
                id="prioridade_id"
                name="prioridade_id"
                value={formData.prioridade_id}
                onChange={handleChange}
              >
                <option value="">
                  Selecione uma prioridade
                </option>

                {prioridades.map((prioridade) => (
                  <option
                    key={prioridade.value}
                    value={prioridade.value}
                  >
                    {prioridade.label}
                  </option>
                ))}
              </select>
            </div>

          </div>


          {/* Fornecedor e Referência */}
          <div className="form-row">

            <div className="add-item-field">
              <label htmlFor="fornecedor">
                Fornecedor
              </label>

              <input
                id="fornecedor"
                name="fornecedor"
                type="text"
                value={formData.fornecedor}
                onChange={handleChange}
                placeholder="Fornecedor"
              />
            </div>

            <div className="add-item-field">
              <label htmlFor="referencia_produto">
                Referência
              </label>

              <input
                id="referencia_produto"
                name="referencia_produto"
                type="text"
                value={formData.referencia_produto}
                onChange={handleChange}
                placeholder="Referência do produto"
              />
            </div>

          </div>


          {/* Código ERP e Solicitante */}
          <div className="form-row">

            <div className="add-item-field">
              <label htmlFor="codigo_erp">
                Código ERP
              </label>

              <input
                id="codigo_erp"
                name="codigo_erp"
                type="number"
                value={formData.codigo_erp}
                onChange={handleChange}
                placeholder="Código ERP"
                min="1"
              />
            </div>

            <div className="add-item-field">
              <label htmlFor="solicitante_nome">
                Solicitante
              </label>

              <input
                id="solicitante_nome"
                name="solicitante_nome"
                type="text"
                value={formData.solicitante_nome}
                placeholder="Nome do solicitante"
                readOnly
              />
            </div>

          </div>


          {/* Observações */}
          <div className="add-item-field">
            <label htmlFor="observacoes">
              Observações
            </label>

            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Digite alguma observação"
              rows="3"
            />
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

            <button
              type="submit"
              className="add-confirm-button"
            >
              Adicionar
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddItemModal;