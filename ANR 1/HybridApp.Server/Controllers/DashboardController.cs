using HybridApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HybridApp.Server.Controllers;

[ApiController]
[Route("api/dashboard")]
public sealed class DashboardController : ControllerBase
{
    [Authorize]
    [HttpGet]
    public ActionResult<DashboardResponse> Get() => Ok(new DashboardResponse(
        User.Identity!.Name!,
        DateTimeOffset.UtcNow,
        new[]
        {
            new DashboardItem("Единый API", "ASP.NET Core обслуживает оба интерфейса", "ready"),
            new DashboardItem("Общая сессия", "Cookie доступна React и Angular", "secure"),
            new DashboardItem("Два клиента", "Переключайтесь без повторного входа", "synced")
        }));
}
