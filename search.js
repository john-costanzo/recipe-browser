function hideElement( id ) {
    console.log( "\t\t\thide element with id=[%s]", id );
    document.getElementById( id ).style.display = "none";
}
function showElement( id ) {
    console.log( "\t\t\tshow element with id=[%s]", id );
    document.getElementById( id ).style.display = "block";
}

// Return true if all of the terms in the array QUERY
// are found within the string STR, else false.
function matchesAll( query, str ) {
     for( const term of query ) {
	const regexp = new RegExp( term );
	if( str.search( regexp ) == -1 ) {
	    return( false );
	}
    }
    return( true );
}
    

// QUERY is an array of strings.
// INDEX is an array of arrays: [ id, index_string ].
// Call hideElement for all elements with an id from INDEX where *all* of the strings
// in the QUERY array may be found as regular expressions in the corresponding index_string. Else call showElement for those ids.
function searchElements( query, index ) {
    let result = []
    console.log( "searchElements: index=[%s]\tquery=[%s]", index.join(", "), query.join(", ") );

    indexLoop:
    for (const idx of index ) {
	const id = idx[0];
	const index_string = idx[1];
	console.log( "\tid=[%s]\tindex_string=[%s]", id, index_string );
	if( matchesAll( query, index_string ) ) {
	    showElement( id );
	} else {
	    hideElement( id );
	}
    }
}

// Assume the keyboard event has already been processed.
// Use the query in the query box to filter the page according to the recipeIndex
function keyboardHandler(e) {
    const key = String.fromCharCode( e.which || e.keyCode ).toLowerCase();
    console.log( "[%s] pressed", key );
    let query = document.getElementById( "searchBox" ).value;
    query = query.replace( /[^0-9a-z ]+/g, "" )
    console.log( "query=[%s]", query );
    searchElements( query.split( " " ), recipeIndex );
}

document.getElementById( "searchBox" ).
    addEventListener('keyup', keyboardHandler);

//==================================================================
// Test Functions
//==================================================================
let recipeIndex = [
    [ 'Breakfast-Pizza', 'breakfast pizza egg spinach butter' ],
    [ 'Breakfast-French-Toast', 'breakfast french toast egg bread cinnamon' ],
    [ 'Bread-Pizza', 'bread pizza flour sauce spinach' ],
    [ 'Bread-Sourdough', 'bread sourdough starter flour salt' ],
];

function searchDriver() {
    const queries = [
	['bre'],
	['bread'],
	['break'],
	['piz'],
	['nach'],
	['garbage'],

	['bre', 'piz'],
	['bre', 'flour'],
    ];
    for( const q of queries ) {
	console.log( "query=[%s]", q.join(", ") );
	searchElements( q, recipeIndex );
    }
}

