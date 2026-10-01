CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL, -- Ex: 'pizza salgada', 'pizza doce', 'bebida', 'borda'
    tamanho VARCHAR(20) NOT NULL,    -- Ex: 'Broto', 'Média', 'Grande', 'Gigante'
    disponivel BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT 
    id AS codigo_produto,
    nome AS nome_pizza,
    preco,
    categoria,
    tamanho,
    disponivel
FROM public.produtos
ORDER BY categoria, nome;

SELECT nome, descricao, preco 
FROM public.produtos 
WHERE categoria = 'pizza salgada' AND tamanho = 'Grande';


UPDATE public.produtos 
SET preco = 12.00 
WHERE nome = 'Coca-Cola 2L';

UPDATE public.produtos 
SET disponivel = FALSE 
WHERE nome = 'Pizza Prestígio';



