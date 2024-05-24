'use client';
import CadastrarPessoa from "@/components/CadastrarPessoa";
import ListaPessoasFisicas from "@/components/ListaPessoasFisicas";
import './styles/styles.css';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Gerenciamento de pessoas</h1>
        <CadastrarPessoa />
      </div>
      <ListaPessoasFisicas />      
    </main>
  );
}
