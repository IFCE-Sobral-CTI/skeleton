<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('password_resets');
        Schema::dropIfExists('password_reset_tokens');
    }

    public function down(): void
    {
        // Re-create tables is not needed - these are standard Laravel tables
        // that would be re-created by a fresh migrate if needed
    }
};
