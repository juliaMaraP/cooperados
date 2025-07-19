<?php

use Hyperf\Database\Schema\Schema;
use Hyperf\Database\Schema\Blueprint;
use Hyperf\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cooperados', function (Blueprint $table) {
        $table->id();
        $table->string('nome');
        $table->string('cpf')->unique();
        $table->string('email')->unique();
        $table->string('telefone'); 
        $table->date('data_nascimento');
        $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cooperados');
    }
};
