import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export interface DBArticle {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author_id: string | null;
  image_url: string | null;
  status: string;
  featured: boolean | null;
  breaking: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  profiles?: { full_name: string | null } | null;
}

export const usePublishedArticles = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("public-articles")
      .on("postgres_changes", { event: "*", schema: "public", table: "articles", filter: "status=eq.published" }, () => {
        queryClient.invalidateQueries({ queryKey: ["published-articles"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  return useQuery({
    queryKey: ["published-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, profiles!articles_author_id_fkey(full_name)")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data as any) as DBArticle[];
    },
  });
};

export const useMyArticles = (userId: string | undefined) =>
  useQuery({
    queryKey: ["my-articles", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("author_id", userId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useAllArticles = () =>
  useQuery({
    queryKey: ["all-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, profiles!articles_author_id_fkey(full_name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as any) as DBArticle[];
    },
  });

export const useCreateArticle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (article: {
      title: string; excerpt: string; body: string; category: string;
      author_id: string; image_url?: string; status?: string;
    }) => {
      const { data, error } = await supabase.from("articles").insert(article).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-articles"] });
      qc.invalidateQueries({ queryKey: ["all-articles"] });
    },
  });
};

export const useUpdateArticle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase.from("articles").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-articles"] });
      qc.invalidateQueries({ queryKey: ["all-articles"] });
      qc.invalidateQueries({ queryKey: ["published-articles"] });
    },
  });
};
