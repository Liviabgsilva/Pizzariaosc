
CREATE TABLE IF NOT EXISTS public.clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) UNIQUE NOT NULL,
    endereco TEXT NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    referencia TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO public.clientes (nome, telefone, endereco, bairro, referencia) 
VALUES 
('João Silva', '(11) 99999-1111', 'Rua das Pizzas, 123', 'Centro', 'Próximo à praça central'),
('Maria Oliveira', '(11) 98888-2222', 'Av. dos Sabores, 456, Apto 22', 'Jardins', 'Bloco B, portaria 2'),
('Carlos Souza', '(11) 97777-3333', 'Rua Forno a Lenha, 789', 'Vila Nova', 'Ao lado da farmácia')
ON CONFLICT (telefone) DO NOTHING;



SELECT id, nome, telefone, bairro FROM public.clientes ORDER BY nome ASC;

SELECT * FROM public.clientes WHERE telefone = '(11) 99999-1111';

SELECT nome, telefone, endereco FROM public.clientes WHERE bairro = 'Centro';


UPDATE public.clientes 
SET endereco = 'Nova Av. das Pizzas, 999', referencia = 'Esquina com o mercado' 
WHERE id = 1;

