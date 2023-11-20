using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers;

[Route("api/tarefa")]
[ApiController]
public class TarefaController : ControllerBase
{
    private readonly AppDataContext _context;

    public TarefaController(AppDataContext context) =>
        _context = context;

    // GET: api/tarefa/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas.Include(x => x.Categoria).ToList();
            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


    // POST: api/tarefa/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Tarefa tarefa)
    {
        try
        {
            Categoria? categoria = _context.Categorias.Find(tarefa.CategoriaId);
            if (categoria == null)
            {
                return NotFound();
            }
            tarefa.Categoria = categoria;
            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();
            return Created("", tarefa);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // PATCH: api/tarefa/listar - não sei bem como funciona AINDA
    [HttpPatch]
    [Route("alterar")]
    public async Task<IActionResult> alterar([FromRoute] int idTarefa)
    {
        try
        {
            Tarefa? tarefa = await _context.Tarefas
                .FirstOrDefaultAsync(x => x.TarefaId == idTarefa);

            if(tarefa == null){
                return NotFound("Nenhuma tarefa encontrada");
            }

            if(tarefa.Status == "Não Iniciada"){
                tarefa.Status =  "Em Andamento";
            }else if(tarefa.Status == "Em Andamento"){
                tarefa.Status =  "Concluída";
            }else{
                return NotFound("Operação impossível");
            }

            _context.Tarefas.Update(tarefa);
            _context.SaveChanges();
            return Ok(tarefa);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("naoconcluidas")]
    public IActionResult ListarNaoConcluidas()
    {
        try
        {
            //teste com WHERE
            List<Tarefa> tarefas = _context.Tarefas
                .Where(x => x.Status == "Não Iniciada")
                .Include(x => x.Categoria).ToList();

            

            if(tarefas == null){
                return NotFound("Nenhuma tarefa encontrada");
            }
            //caso teste com include não funfar, tem esse
            /*
            List<Tarefa> tarefasNaoConcluidas ;

            foreach(var tarefa in tarefas){
                if(tarefa.Status == "Não Iniciada"){
                    tarefasNaoConcluidas.Add(tarefa);
                }
            }*/
            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("concluidas")]
    public IActionResult ListarConcluidas()
    {
        try
        {
            //teste com WHERE
            List<Tarefa> tarefas = _context.Tarefas
                .Where(x => x.Status == "Concluída")
                .Include(x => x.Categoria).ToList();

            if(tarefas == null){
                return NotFound("Nenhuma tarefa encontrada");
            }

            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
