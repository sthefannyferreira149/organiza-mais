package com.example.demo.controller;

import com.example.demo.model.Lista;
import com.example.demo.repository.ListaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listas")
public class ListaController {

    private final ListaRepository repository;

    public ListaController(ListaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Lista> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Lista criar(@RequestBody Lista lista) {
        return repository.save(lista);
    }
} 