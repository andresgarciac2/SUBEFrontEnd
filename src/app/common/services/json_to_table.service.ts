
export class CreateTableFromJSONService {

    /** @ngInject */
    constructor() {
    }

    createTableFromJSON(inputData: any, elementId: string) : any {
        // EXTRACT VALUE FOR HTML HEADER
        var col = [];
        for (var i = 0; i < inputData.length; i++) {
            for (var key in inputData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.className = "table table-striped";
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        
        var thead = table.createTHead();
        var tr = thead.insertRow(-1);                   // TABLE ROW.
        

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        var tbody = table.createTBody();
        var tr2 = tbody.insertRow(-1); 
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < inputData.length; i++) {

            tr2 = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr2.insertCell(-1);
                tabCell.innerHTML = inputData[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.

        $('#' + elementId).append(table);
    }
}