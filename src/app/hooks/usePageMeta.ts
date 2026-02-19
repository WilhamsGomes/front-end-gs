export function usePageMeta(pathname: string) {
  if (pathname.startsWith("/assets"))
    return {
      title: "Ativos",
      subtitle: "Gerencie os ativos da empresa",
    };

  if (pathname.startsWith("/settings"))
    return {
      title: "Configurações",
      subtitle: "Preferências do sistema",
    };

  return {
    title: "Dashboard",
    subtitle: "Visão geral do sistema",
  };
}
