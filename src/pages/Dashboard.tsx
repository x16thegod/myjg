import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMyArticles, useAllArticles, useCreateArticle, useUpdateArticle } from "@/hooks/useArticles";
import { categories } from "@/data/mockArticles";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LogOut, Plus, Eye, CheckCircle, XCircle, Clock, FileText, Users } from "lucide-react";

const statusLabels: Record<string, string> = {
  draft: "Rascunho",
  pending: "Aguardando",
  published: "Publicado",
  rejected: "Rejeitado",
};

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  pending: "bg-pernambuco-yellow text-foreground",
  published: "bg-pernambuco-blue text-primary-foreground",
  rejected: "bg-pernambuco-red text-primary-foreground",
};

const Dashboard = () => {
  const { user, isAdmin, isJournalist, profile, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"articles" | "new" | "manage" | "roles">("articles");

  // Form state
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Role management
  const [roleEmail, setRoleEmail] = useState("");
  const [roleToAssign, setRoleToAssign] = useState<"journalist" | "admin">("journalist");

  const { data: myArticles } = useMyArticles(user?.id);
  const { data: allArticles } = useAllArticles();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  if (authLoading || !user) return null;

  const canWrite = isAdmin || isJournalist;
  const articles = isAdmin ? allArticles : myArticles;

  const handleImageUpload = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("article-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("article-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (status: "draft" | "pending") => {
    if (!title || !excerpt || !body) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        finalImageUrl = await handleImageUpload(imageFile);
      }
      await createArticle.mutateAsync({
        title, excerpt, body, category, author_id: user.id,
        image_url: finalImageUrl || undefined,
        status: isAdmin ? (status === "pending" ? "published" : status) : status,
      });
      toast.success(status === "draft" ? "Rascunho salvo!" : isAdmin ? "Artigo publicado!" : "Artigo enviado para aprovação!");
      setTitle(""); setExcerpt(""); setBody(""); setImageUrl(""); setImageFile(null);
      setTab("articles");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleApprove = async (id: string) => {
    await updateArticle.mutateAsync({ id, status: "published", published_at: new Date().toISOString() });
    toast.success("Artigo aprovado e publicado!");
  };

  const handleReject = async (id: string) => {
    await updateArticle.mutateAsync({ id, status: "rejected" });
    toast.success("Artigo rejeitado.");
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await updateArticle.mutateAsync({ id, featured: !current });
    toast.success(current ? "Removido dos destaques" : "Marcado como destaque!");
  };

  const handleAssignRole = async () => {
    if (!roleEmail) return;
    try {
      // Find user by email through profiles - we need a different approach
      // For simplicity, admin can assign by providing user ID or email
      const { data: userData } = await supabase.from("profiles").select("id").limit(100);
      // This is a simplified approach - in production you'd have an edge function
      toast.info("Para atribuir roles, use o painel do Cloud diretamente por enquanto.");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex gap-1 mb-3">
              <span className="w-8 h-1 bg-pernambuco-blue" />
              <span className="w-8 h-1 bg-pernambuco-yellow" />
              <span className="w-8 h-1 bg-pernambuco-red" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-black">Painel Editorial</h1>
            <p className="meta-text mt-2">
              {profile?.full_name || user.email} · {isAdmin ? "Administrador" : isJournalist ? "Jornalista" : "Leitor"}
            </p>
          </div>
          <button
            onClick={() => { signOut(); navigate("/"); }}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-foreground/10 mb-8 overflow-x-auto">
          <button
            onClick={() => setTab("articles")}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.1em] border-b-[3px] transition-colors whitespace-nowrap ${
              tab === "articles" ? "border-pernambuco-blue text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText size={14} /> Meus Artigos
          </button>
          {canWrite && (
            <button
              onClick={() => setTab("new")}
              className={`flex items-center gap-2 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.1em] border-b-[3px] transition-colors whitespace-nowrap ${
                tab === "new" ? "border-pernambuco-yellow text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Plus size={14} /> Novo Artigo
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => setTab("manage")}
              className={`flex items-center gap-2 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.1em] border-b-[3px] transition-colors whitespace-nowrap ${
                tab === "manage" ? "border-pernambuco-red text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye size={14} /> Gerenciar
            </button>
          )}
        </div>

        {/* Content */}
        {tab === "articles" && (
          <div>
            {!canWrite && (
              <div className="bg-secondary/60 p-6 mb-6">
                <p className="font-sans text-sm text-muted-foreground">
                  Você é um leitor. Para publicar artigos, peça a um administrador para te atribuir o papel de <strong>jornalista</strong>.
                </p>
              </div>
            )}
            {articles && articles.length > 0 ? (
              <div className="space-y-3">
                {articles.map((a) => (
                  <div key={a.id} className="flex items-center gap-4 p-4 border border-foreground/5 hover:border-foreground/10 transition-colors">
                    {a.image_url && (
                      <img src={a.image_url} alt="" className="w-16 h-12 object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base font-semibold truncate">{a.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${statusColors[a.status]}`}>
                          {statusLabels[a.status]}
                        </span>
                        <span className="meta-text">{a.category}</span>
                        <span className="meta-text">{new Date(a.created_at).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                    {isAdmin && a.status === "pending" && (
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleApprove(a.id)} className="p-2 text-green-600 hover:bg-green-50 transition-colors" title="Aprovar">
                          <CheckCircle size={18} />
                        </button>
                        <button onClick={() => handleReject(a.id)} className="p-2 hover:bg-red-50 transition-colors" style={{ color: "hsl(var(--pernambuco-red))" }} title="Rejeitar">
                          <XCircle size={18} />
                        </button>
                      </div>
                    )}
                    {isAdmin && a.status === "published" && (
                      <button
                        onClick={() => handleToggleFeatured(a.id, !!a.featured)}
                        className={`meta-text px-3 py-1 transition-colors ${a.featured ? "bg-pernambuco-yellow text-foreground" : "bg-muted"}`}
                      >
                        {a.featured ? "★ Destaque" : "☆ Destacar"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Clock size={40} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="font-serif text-xl text-muted-foreground">Nenhum artigo ainda</p>
                {canWrite && (
                  <button onClick={() => setTab("new")} className="mt-4 font-mono text-[11px] text-primary uppercase tracking-[0.1em] hover:underline">
                    Escrever primeiro artigo →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {tab === "new" && canWrite && (
          <div className="max-w-3xl">
            <div className="space-y-5">
              <div>
                <label className="meta-text block mb-2">Título *</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full py-3 px-4 bg-secondary/50 border border-foreground/10 font-serif text-xl font-bold outline-none focus:border-primary transition-colors"
                  placeholder="Título do artigo..."
                />
              </div>
              <div>
                <label className="meta-text block mb-2">Resumo *</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full py-3 px-4 bg-secondary/50 border border-foreground/10 font-sans text-sm outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Um breve resumo do artigo..."
                />
              </div>
              <div>
                <label className="meta-text block mb-2">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-3 px-4 bg-secondary/50 border border-foreground/10 font-sans text-sm outline-none focus:border-primary transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="meta-text block mb-2">Imagem de capa</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full py-3 px-4 bg-secondary/50 border border-foreground/10 font-sans text-sm"
                />
                <p className="meta-text mt-1">Ou cole uma URL:</p>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full mt-1 py-2 px-4 bg-secondary/50 border border-foreground/10 font-sans text-sm outline-none focus:border-primary transition-colors"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="meta-text block mb-2">Conteúdo *</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={15}
                  className="w-full py-3 px-4 bg-secondary/50 border border-foreground/10 font-sans text-[15px] leading-relaxed outline-none focus:border-primary transition-colors resize-y"
                  placeholder="Escreva seu artigo aqui... Use parágrafos separados por linha em branco."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleSubmit("draft")}
                  disabled={createArticle.isPending}
                  className="px-6 py-3 border border-foreground/10 font-mono text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  Salvar rascunho
                </button>
                <button
                  onClick={() => handleSubmit("pending")}
                  disabled={createArticle.isPending}
                  className="px-6 py-3 bg-pernambuco-blue text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isAdmin ? "Publicar agora" : "Enviar para aprovação"}
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "manage" && isAdmin && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {["draft", "pending", "published", "rejected"].map((s) => {
                const count = allArticles?.filter((a) => a.status === s).length || 0;
                return (
                  <div key={s} className="p-4 bg-secondary/40 border border-foreground/5">
                    <span className="meta-text">{statusLabels[s]}</span>
                    <p className="font-serif text-3xl font-black mt-1">{count}</p>
                  </div>
                );
              })}
            </div>

            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Aguardando aprovação
            </h3>
            {allArticles?.filter((a) => a.status === "pending").map((a) => (
              <div key={a.id} className="flex items-start gap-4 p-4 border border-foreground/5 mb-3">
                <div className="flex-1">
                  <h4 className="font-serif text-lg font-bold">{a.title}</h4>
                  <p className="font-sans text-sm text-muted-foreground mt-1 line-clamp-2">{a.excerpt}</p>
                  <span className="meta-text mt-2 block">
                    Por {(a as any).profiles?.full_name || "Anônimo"} · {a.category} · {new Date(a.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleApprove(a.id)} className="px-4 py-2 bg-pernambuco-blue text-primary-foreground font-mono text-[10px] font-bold uppercase tracking-wider">
                    Aprovar
                  </button>
                  <button onClick={() => handleReject(a.id)} className="px-4 py-2 border border-foreground/10 font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-secondary">
                    Rejeitar
                  </button>
                </div>
              </div>
            ))}
            {(!allArticles || allArticles.filter((a) => a.status === "pending").length === 0) && (
              <p className="text-muted-foreground font-sans text-sm py-8 text-center">Nenhum artigo aguardando aprovação.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
