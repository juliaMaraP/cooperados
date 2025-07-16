<?php

use Hyperf\Database\Schema\Schema;
use Hyperf\Database\Migrations\Migration;

class UpdateCooperadosAddRendaAndNullableEmail extends Migration
{
    public function up(): void
    {
        
        Schema::getConnection()->statement("
            ALTER TABLE cooperados
            ADD COLUMN renda DECIMAL(10,2) NULL AFTER data_nascimento,
            MODIFY email VARCHAR(255) NULL
        ");
    }

    public function down(): void
    {
        Schema::getConnection()->statement("
            ALTER TABLE cooperados
            DROP COLUMN renda,
            MODIFY email VARCHAR(255) NOT NULL
        ");
    }
}
