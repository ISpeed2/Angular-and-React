namespace HybridApp.Server.Models;

public sealed record LoginRequest(string? Name);
public sealed record SessionResponse(bool IsAuthenticated, string? Name);
public sealed record DashboardItem(string Title, string Description, string Status);
public sealed record DashboardResponse(string User, DateTimeOffset GeneratedAt, IReadOnlyList<DashboardItem> Items);
