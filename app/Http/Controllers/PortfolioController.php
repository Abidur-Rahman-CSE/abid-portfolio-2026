<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $featuredProjects = Project::latest()->take(3)->get();
        $skills = Skill::all();

        return Inertia::render('portfolio/home', [
            'featuredProjects' => $featuredProjects,
            'skills' => $skills,
        ]);
    }

    public function about()
    {
        return Inertia::render('portfolio/about');
    }

    public function experience()
    {
        return Inertia::render('portfolio/experience');
    }

    public function projects()
    {
        $projects = Project::latest()->get();

        return Inertia::render('portfolio/projects', [
            'projects' => $projects,
        ]);
    }

    public function projectShow(Project $project)
    {
        return Inertia::render('portfolio/project-show', [
            'project' => $project,
        ]);
    }

    public function skills()
    {
        $skills = Skill::all();

        return Inertia::render('portfolio/skills', [
            'skills' => $skills,
        ]);
    }

    public function contact()
    {
        return Inertia::render('portfolio/contact');
    }
}
