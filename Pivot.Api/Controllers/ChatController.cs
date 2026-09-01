using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;

namespace Pivot.Api.Controllers;

// Tells ASP.NET this is an API, which automatically turns on helpful features like auto-rejecting bad data with 400 Bad Request errors.
[ApiController]
[Route("api/v1/chat")] // This names the route!
public class ChatController : ControllerBase
{
    private readonly IChatClient _aiClient;

    // 1. DEPENDENCY INJECTION: The server automatically hands us the Singleton from the toolbox!
    public ChatController(IChatClient aiClient)
    {
        _aiClient = aiClient;
    }

    // Attribute below has hundreds of lines of code written by ms. One is to make sure the client is submitting data ie a Post request. 
    [HttpPost]

    //Behind the scenes, the Microsoft Task object is doing insanely complex math. It talks directly to your computer's CPU, manages the Windows thread pool, puts threads to sleep, and wakes them back up.
//  You hand that Task to the .NET Engine, and the .NET Engine acts like a manager. The engine looks at the computer's CPU hardware, finds an available Thread, and assigns the Task to it.
// the IActionResult is the shipping box, - C# takes the word "Paris", packs it inside slaps a 200 OK sticker on it, and mails the box back across the internet.
//[FromQuery] is an attribute. it is a sticky note that tells the .NET engine to not search the entire HTTP packet, but only look in the query string (the query string is the part 
// of the web address that comes after the question mark eg http://localhost:5052/api/chat?userMessage=What is the capital of France)
    public async Task<IActionResult> AskAI([FromQuery] string userMessage) 
    {
        // We use the Singleton to ask Azure the question
        var response = await _aiClient.GetResponseAsync(userMessage);
        
        // We hand the answer back with a 200 OK success code
        return Ok(response.Text);
    }
}