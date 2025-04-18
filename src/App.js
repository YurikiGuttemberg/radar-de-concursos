
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";

let nextId = 4;
const initialPosts = [
  {
    id: 1,
    title: "Concurso INSS 2025: Edital previsto para junho",
    summary: "O novo edital do INSS pode oferecer mais de 7 mil vagas em todo o Brasil.",
    content: "O Instituto Nacional do Seguro Social (INSS) está se preparando para lançar um novo edital em junho de 2025...",
    category: "federal",
    date: "2025-04-10"
  },
  {
    id: 2,
    title: "TJ-SP abre 500 vagas para Escrevente Técnico Judiciário",
    summary: "Inscrições começam em maio, com provas previstas para julho.",
    content: "O Tribunal de Justiça de São Paulo (TJ-SP) divulgou que abrirá 500 vagas...",
    category: "tribunais",
    date: "2025-04-12"
  },
  {
    id: 3,
    title: "Banco do Brasil autoriza novo concurso para 2025",
    summary: "São esperadas oportunidades para escriturário em todo o país.",
    content: "O Banco do Brasil confirmou a autorização para um novo concurso público...",
    category: "bancos",
    date: "2025-04-15"
  },
];

function HomePage({ posts }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPosts = posts.filter(post => {
    const matchTitle = post.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filter ? post.category === filter : true;
    return matchTitle && matchCategory;
  });

  return (
    <section className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/2"
        />
        <select
          className="border border-gray-300 rounded-md p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          <option value="federal">Federais</option>
          <option value="tribunais">Tribunais</option>
          <option value="bancos">Bancos</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="bg-white shadow rounded-2xl">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{post.summary}</p>
              <span className="text-xs text-gray-500 italic block mt-1">Categoria: {post.category}</span>
              <span className="text-xs text-gray-400 block">Publicado em: {post.date}</span>
              <Link to={`/post/${post.id}`}><Button className="mt-4">Leia mais</Button></Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function PostPage({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <div className="p-6">Post não encontrado.</div>;
  }

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <span className="text-sm text-gray-500 italic mb-2 block">Categoria: {post.category} | Publicado em: {post.date}</span>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
    </section>
  );
}

function AdminPage({ posts, setPosts }) {
  const [formData, setFormData] = useState({ title: "", summary: "", content: "", category: "", date: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { ...formData, id: nextId++ };
    setPosts([newPost, ...posts]);
    navigate("/");
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Adicionar Nova Notícia</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
        <Input name="summary" placeholder="Resumo" value={formData.summary} onChange={handleChange} required />
        <Textarea name="content" placeholder="Conteúdo" value={formData.content} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange} required className="border p-2 rounded-md">
          <option value="">Selecione uma categoria</option>
          <option value="federal">Federal</option>
          <option value="tribunais">Tribunais</option>
          <option value="bancos">Bancos</option>
        </select>
        <Input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <Button type="submit">Publicar</Button>
      </form>
    </section>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-white p-6 shadow-inner mt-10 max-w-2xl mx-auto rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Fale Conosco</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input type="text" name="name" placeholder="Seu nome" value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Seu e-mail" value={formData.email} onChange={handleChange} required />
        <Textarea name="message" placeholder="Sua mensagem" value={formData.message} onChange={handleChange} required />
        <Button type="submit">Enviar</Button>
      </form>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Sobre o Radar de Concursos</h2>
      <p className="text-gray-700">
        O Radar de Concursos é um portal dedicado a informar sobre os principais concursos públicos do Brasil. Nossa missão é manter você sempre atualizado com notícias confiáveis, editais e dicas de preparação.
      </p>
    </section>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-900 text-white p-6 shadow-md flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Radar de Concursos</h1>
          <p className="text-sm">Fique por dentro dos principais concursos públicos do Brasil</p>
        </div>
        <nav className="mt-4 md:mt-0 space-x-4">
          <Link to="/" className="hover:underline">Início</Link>
          <Link to="/sobre" className="hover:underline">Sobre</Link>
          <Link to="/contato" className="hover:underline">Contato</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
        </nav>
      </header>
      {children}
      <footer className="bg-blue-900 text-white text-sm text-center p-4 mt-10">
        <p>© 2025 Radar de Concursos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default function App() {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage posts={posts} />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage posts={posts} setPosts={setPosts} />} />
          <Route path="/post/:id" element={<PostPage posts={posts} />} />
          <Route path="*" element={<div className="p-6 text-center text-red-600">Página não encontrada</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}
