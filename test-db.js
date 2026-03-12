const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function test() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log("Fetching schema info for 'familias'...");
    // We can use a trick: select a non-existent column to see the listed valid columns in the error message
    const { error } = await supabase.from('familias').select('non_existent_column_for_discovery').limit(1);
    console.log("Discovery error (expected):", error?.message);

    const { error: error2 } = await supabase.from('comuneros').select('non_existent_column_for_discovery').limit(1);
    console.log("Discovery error comuneros (expected):", error2?.message);
}

test();
