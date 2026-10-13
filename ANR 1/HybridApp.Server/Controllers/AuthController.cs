using System.Security.Claims;
using HybridApp.Server.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HybridApp.Server.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    [HttpGet("session")]
    public ActionResult<SessionResponse> Session() =>
        Ok(new SessionResponse(User.Identity?.IsAuthenticated == true, User.Identity?.Name));

    [HttpPost("login")]
    public async Task<ActionResult<SessionResponse>> Login(LoginRequest request)
    {
        var displayName = request.Name?.Trim() ?? string.Empty;
        if (displayName.Length is < 2 or > 40)
        {
            return BadRequest(new { message = "Имя должно содержать от 2 до 40 символов." });
        }

        var identity = new ClaimsIdentity(
            new[] { new Claim(ClaimTypes.Name, displayName) },
            CookieAuthenticationDefaults.AuthenticationScheme);

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(identity),
            new AuthenticationProperties { IsPersistent = true });

        return Ok(new SessionResponse(true, displayName));
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return NoContent();
    }
}
