
CREATE TABLE public.pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES public.clientes(id) ON DELETE RESTRICT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'Recebido',
    forma_pagamento VARCHAR(30) NOT NULL,
    taxa_entrega DECIMAL(10, 2) DEFAULT 0.00,
    valor_total DECIMAL(10, 2) NOT NULL,
    observacoes TEXT
);

INSERT INTO public.pedidos (cliente_id, status, forma_pagamento, taxa_entrega, valor_total, observacoes) 
VALUES 
(1, 'Recebido', 'PIX', 5.00, 54.90, 'Enviar sachê de maionese temperada e ketchup.'),
(2, 'No Forno', 'Cartão Crédito', 7.00, 112.00, 'Interfone não funciona, favor ligar ao chegar.'),
(1, 'Entregue', 'Dinheiro', 5.00, 45.00, 'Troco para R$ 50,00.');

SELECT 
    p.id AS numero_pedido,
    c.nome AS nome_cliente,
    c.telefone AS telefone_cliente,
    p.status,
    p.forma_pagamento,
    p.valor_total,
    p.data_hora
FROM public.pedidos p
INNER JOIN public.clientes c ON p.cliente_id = c.id
ORDER BY p.data_hora DESC;


SELECT id, cliente_id, status, observacoes 
FROM public.pedidos 
WHERE status IN ('Recebido', 'No Forno', 'Saiu para Entrega')
ORDER BY data_hora ASC;


SELECT 
    COUNT(id) AS total_pedidos_vendidos,
    SUM(taxa_entrega) AS total_arrecadado_frete,
    SUM(valor_total) AS faturamento_bruto_total
FROM public.pedidos;

UPDATE public.pedidos 
SET status = 'No Forno' 
WHERE id = 1;


UPDATE public.pedidos 
SET status = 'Saiu para Entrega' 
WHERE id = 1;