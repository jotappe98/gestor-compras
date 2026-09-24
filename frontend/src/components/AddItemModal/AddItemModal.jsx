import { useEffect, useState } from "react";
import { getRequesterByCode, createItem } from "../../services/api";
import "../../styles/AddItemModal.css";

function AddItemModal({ 
  isOpen,
  onClose, 
  onItemCreated,
  itemToEdit = null,
  isEditMode = false,
 }) {
  const [formData, setFormData] = useState({
    produto: "",
    quantidade: "",
    unidade_medida: "",
    categoria_id: "",
    prioridade_id: "",
    fornecedor: "",
    referencia_produto: "",
    codigo_erp: "",
    observacoes: "",
  });

  const [solicitanteNome, setSolicitanteNome] = useState("");
  const [requesterStatus, setRequesterStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeField, setShakeField] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [duplicateItem, setDuplicateItem] = useState(null);
  const [activeErrorField, setActiveErrorField] = useState("");

  // Consulta o solicitante pelo código ERP
  useEffect(() => {
    const codigo = String(formData.codigo_erp ?? "").trim();

    if (codigo === "" || !/^\d+$/.test(codigo)) {
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setRequesterStatus("loading");

        const requester = await getRequesterByCode(codigo);

        if (cancelled) return;

        if (!requester || !requester.nome) {
          throw new Error("Solicitante sem nome");
        }

        setSolicitanteNome(requester.nome);
        setRequesterStatus("success");
      } catch {
        if (cancelled) return;

        setSolicitanteNome("");
        setRequesterStatus("error");
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [formData.codigo_erp]);

  

  // Bloqueia o scroll enquanto o modal estiver aberto
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

  if (!isOpen) {
    return null;
  }


  function handleChange(event) {
    const { name, value } = event.target;

    const sanitizedValue =
      name === "codigo_erp" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Limpa o erro do campo alterado
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // Remove a mensagem de erro ativa
    setActiveErrorField((current) =>
      current === name ? "" : current
    );

    // Remove a animação do campo alterado
    setShakeField((current) =>
      current === name ? "" : current
    );

    // Limpa o solicitante ao alterar o código ERP
    if (name === "codigo_erp") {
      setSolicitanteNome("");
      setRequesterStatus("idle");
    }
  }


  function triggerShake(fieldName) {
    setShakeField("");

    requestAnimationFrame(() => {
      setShakeField(fieldName);
    });

    setTimeout(() => {
      setShakeField("");
    }, 400);
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.produto.trim()) {
      newErrors.produto = "O produto é obrigatório.";
    }

    if (!formData.prioridade_id) {
      newErrors.prioridade_id = "A prioridade é obrigatória.";
    }

    if (!formData.codigo_erp.trim()) {
      newErrors.codigo_erp = "O código ERP é obrigatório.";
    } else if (requesterStatus !== "success" || !solicitanteNome) {
      newErrors.codigo_erp = "Informe um código ERP válido.";
    }

    setErrors(newErrors);

    const fieldOrder = [
      "produto",
      "prioridade_id",
      "codigo_erp",
    ];

    const firstErrorField = fieldOrder.find(
      (fieldName) => newErrors[fieldName]
    );

    setActiveErrorField(firstErrorField || "");

    return {
      isValid: Object.keys(newErrors).length === 0,
      firstErrorField,
    };
  }

  function handleKeyDown(event) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const form = event.currentTarget.form;

    if (!form) {
      return;
    }

    const fields = Array.from(
      form.querySelectorAll("input, select, textarea")
    ).filter((field) => !field.readOnly && !field.disabled);

    const currentIndex = fields.indexOf(event.currentTarget);
    const isLastField = currentIndex === fields.length - 1;

    if (isLastField) {
      form.requestSubmit();
      return;
    }

    const nextField = fields[currentIndex + 1];

    if (nextField) {
      nextField.focus();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const { isValid, firstErrorField } = validateForm();

    if (!isValid) {
      triggerShake(firstErrorField);

      const field = document.getElementById(firstErrorField);

      if (field) {
        field.focus();
      }

      return;
    }

    const dataToSend = {
      produto: formData.produto.trim(),

      prioridade_id: Number(formData.prioridade_id),

      codigo_erp: Number(formData.codigo_erp),

      quantidade: formData.quantidade
        ? Number(formData.quantidade)
        : undefined,
      
      unidade_medida: formData.unidade_medida || undefined,

      categoria_id: formData.categoria_id
        ? Number(formData.categoria_id)
        : undefined,

      fornecedor: formData.fornecedor.trim() || undefined,

      referencia_produto:
        formData.referencia_produto.trim() || undefined,

      observacoes:
        formData.observacoes.trim() || undefined,
    };

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const response = await createItem(dataToSend);

      console.log("Item criado:", response);

      onItemCreated();

      resetForm();

      onClose();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);

      if (error.data?.duplicate) {
        setDuplicateItem(true);
        return;
      }

      setSubmitError(
        error.message || "Erro ao adicionar item."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDuplicate() {
    if (isSubmitting) {
      return;
    }

    const dataToSend = {
      produto: formData.produto.trim(),

      prioridade_id: Number(formData.prioridade_id),

      codigo_erp: Number(formData.codigo_erp),

      quantidade: formData.quantidade
        ? Number(formData.quantidade)
        : undefined,

      unidade_medida: formData.unidade_medida || undefined,

      categoria_id: formData.categoria_id
        ? Number(formData.categoria_id)
        : undefined,

      fornecedor: formData.fornecedor.trim() || undefined,

      referencia_produto:
        formData.referencia_produto.trim() || undefined,

      observacoes:
        formData.observacoes.trim() || undefined,

      confirm_duplicate: true,
    };

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const response = await createItem(dataToSend);

      console.log("Item duplicado criado:", response);

      setDuplicateItem(false);

      onItemCreated();

      resetForm();

      onClose();
    } catch (error) {
      console.error("Erro ao confirmar duplicidade:", error);

      setSubmitError(
        error.message || "Erro ao adicionar item."
      );
    } finally {
      setIsSubmitting(false);
    }

  }

    function resetForm() {
      setFormData({
        produto: "",
        quantidade: "",
        unidade_medida: "",
        categoria_id: "",
        prioridade_id: "",
        fornecedor: "",
        referencia_produto: "",
        codigo_erp: "",
        observacoes: "",
      });

      setSolicitanteNome("");
      setRequesterStatus("idle");

      setErrors({});
      setActiveErrorField("");
      setShakeField("");

      setSubmitError("");
      setDuplicateItem(false);
    }


  return (
    <div
      className="add-item-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          resetForm();
          onClose();
        }
      }}
    >
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
              onKeyDown={handleKeyDown}
              placeholder="Digite o nome do produto"
              autoFocus
              className={`${
                activeErrorField === "produto" && errors.produto
                  ? "input-error"
                  : ""
              } ${
                shakeField === "produto" ? "shake" : ""
              }`}
            />

            {activeErrorField === "produto" && errors.produto && (
              <span className="field-error">
                {errors.produto}
              </span>
            )}
          </div>

          {/* Quantidade e Unidade */}
          <div className="form-row">
            <div className="add-item-field">
              <label htmlFor="quantidade">Quantidade</label>

              <input
                id="quantidade"
                name="quantidade"
                type="number"
                value={formData.quantidade}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Quantidade"
                min="1"
              />
            </div>

            <div className="add-item-field">
              <label htmlFor="unidade_medida">Unidade</label>

              <select
                id="unidade_medida"
                name="unidade_medida"
                value={formData.unidade_medida}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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

          {/* Categoria e Prioridade */}
          <div className="form-row">
            <div className="add-item-field">
              <label htmlFor="categoria_id">Categoria</label>

              <select
                id="categoria_id"
                name="categoria_id"
                value={formData.categoria_id}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              >
                <option value="">Selecione uma categoria</option>

                {categorias.map((categoria) => (
                  <option key={categoria.value} value={categoria.value}>
                    {categoria.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="add-item-field">
              <label htmlFor="prioridade_id">Prioridade</label>

              <select
                id="prioridade_id"
                name="prioridade_id"
                value={formData.prioridade_id}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`${
                  activeErrorField === "prioridade_id" &&
                  errors.prioridade_id
                    ? "input-error"
                    : ""
                } ${
                  shakeField === "prioridade_id" ? "shake" : ""
                }`}
              >
                <option value="">Selecione uma prioridade</option>

                {prioridades.map((prioridade) => (
                  <option key={prioridade.value} value={prioridade.value}>
                    {prioridade.label}
                  </option>
                ))}
              </select>

              {activeErrorField === "prioridade_id" &&
              errors.prioridade_id && (
                <span className="field-error">
                  {errors.prioridade_id}
                </span>
              )}
            </div>
          </div>

          {/* Fornecedor e Referência */}
          <div className="form-row">
            <div className="add-item-field">
              <label htmlFor="fornecedor">Fornecedor</label>

              <input
                id="fornecedor"
                name="fornecedor"
                type="text"
                value={formData.fornecedor}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Fornecedor"
              />
            </div>

            <div className="add-item-field">
              <label htmlFor="referencia_produto">Referência</label>

              <input
                id="referencia_produto"
                name="referencia_produto"
                type="text"
                onKeyDown={handleKeyDown}
                value={formData.referencia_produto}
                onChange={handleChange}
                placeholder="Referência do produto"
              />
            </div>
          </div>

          {/* Código ERP e Solicitante */}
          <div className="form-row">
            <div className="add-item-field">
              <label htmlFor="codigo_erp">Código ERP</label>

              <input
                id="codigo_erp"
                name="codigo_erp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.codigo_erp}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Código ERP"
                className={`${
                  activeErrorField === "codigo_erp" &&
                  errors.codigo_erp
                    ? "input-error"
                    : ""
                } ${
                  shakeField === "codigo_erp" ? "shake" : ""
                }`}
              />

              {activeErrorField === "codigo_erp" &&
              errors.codigo_erp && (
                <span className="field-error">
                  {errors.codigo_erp}
                </span>
              )}
            </div>

            <div className="add-item-field">
              <label htmlFor="solicitante_nome">Solicitante</label>

              <input
                id="solicitante_nome"
                name="solicitante_nome"
                type="text"
                value={solicitanteNome}
                placeholder="Nome do solicitante"
                readOnly
              />

              {requesterStatus === "loading" && (
                <span className="requester-message">
                  Consultando solicitante...
                </span>
              )}

              {requesterStatus === "error" &&
                formData.codigo_erp !== "" && (
                  <span className="requester-message error">
                    Código ERP não encontrado.
                  </span>
                )}
            </div>
          </div>

          {/* Observações */}
          <div className="add-item-field">
            <label htmlFor="observacoes">Observações</label>

            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Digite alguma observação"
              rows="3"
            />
          </div>

          {submitError && (
            <div className="submit-error">
              {submitError}
            </div>
          )}

          {/* Botões */}
          <div className="add-item-actions">
            <button
              type="button"
              className="cancel-button"
              onClick= {() =>{
                resetForm();
                onClose();
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="add-confirm-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adicionando..." : "Adicionar"}
            </button>
          </div>
        </form>

        {duplicateItem && (
          <div
            className="duplicate-overlay"
            onClick={() => setDuplicateItem(false)}
          >
            <div
              className="duplicate-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <h3>Item duplicado</h3>

              <p>
                Esse item já existe. Adicionar mesmo assim?
              </p>

              <div className="duplicate-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setDuplicateItem(false)}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="add-confirm-button"
                  onClick={handleConfirmDuplicate}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Adicionando..."
                    : "Adicionar mesmo assim"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddItemModal;
