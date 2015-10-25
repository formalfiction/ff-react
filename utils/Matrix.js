// row-first matrix
function Matrix (width, height, sortFn, parseData, overflowRow, info) {
	height || (height == 0);

	this.width = width || 0
	this.sortFn = sortFn;
	this.parseData = parseData;
	this.info = info;
	this.overflowRow = overflowRow;

	this.data = [];
	this.matrix = [];
	for (var i=0; i < height; i++) {
		this.addRow.call(this,undefined);
	}

	return this;
}

Matrix.prototype.height = function () {
	return this.matrix.length;
}

Matrix.prototype.clear = function () {
	this.data = [];
	this.matrix = [];

	return this;
}

Matrix.prototype.setData = function (data) {
	if (!this.isArray(data)) { return this; }
	this.clear();

	for (var i=0,d; d=data[i]; i++) {
		this.addData(d);
	}

	return this;
}

Matrix.prototype.addData = function (data) {
	var row = this.parseData(data, this.data.length + 1, this.info);
	if (row) {
		if (row.length == this.width) {
			this.data.push(data);
			this.mergeAddRow(row);
		}
	}
	return this;
}

Matrix.prototype.dataSegments = function () {
	var self = this, segments = this.segments();
	segments.forEach(function(seg){
		seg.data = self.data[seg.value - 1];
	});

	return segments;
}

Matrix.prototype.overflowDataSegments = function() {
	var self = this, segments = this.overflowSegments();
	segments.forEach(function(seg){
		if (seg.value > 0) { 
			seg.data = self.data[seg.value - 1];
		} else if (seg.value < 0) {
			seg.data = { type : "more", num : -seg.value, title : -seg.value + " more..." };
		}
	});

	return segments;
}

// Add a row. If no row information is provided, an empty row will be added
// to the end. if this matrix has a sortFn provided, non-empty rows will be
// sort-inserted;
Matrix.prototype.addRow = function (row) {
	if (!row){
		row = new Array(this.width);
		for (var i=0; i<this.width; i++) {
			row[i] = 0; 
		}
		this.matrix.push(row);
		return this.matrix.length;
	}

	if (typeof this.sortFn === "function" && this.matrix.length >= 1) {
		var result;
		for (var i=0; i < this.matrix.length; i++) {
			result = this.sortFn.call(this, row, this.matrix[i]);
			if (result == 0 || result == -1) {
				this.matrix.splice(i,0,row);
				return this.matrix.length;
			}
		}
	}

	this.matrix.push(row);
	return this.matrix.length;
}

Matrix.prototype.addRows = function (rows) {
	if (!this.isArray(rows)) { return this; }
	var self = this;
	rows.forEach(function(row){
		self.addRow(row);
	});
	return this;
}

Matrix.prototype.removeRow = function(index) {
	return this.matrix.splice(index,1)[0];
}

Matrix.prototype.rowsIntersect = function(a, b) {
	a = (this.isArray(a)) ? a : this.matrix[a];
	b = (this.isArray(b)) ? b : this.matrix[b];

	for (var i=0; i < this.width; i++ ) {
		if (a[i] && b[i]) { return true; }
	}
	return false;
}

Matrix.prototype.mergeRows = function (aIndex,bIndex) {
	var row = new Array(this.width);
	for (var i=0; i < this.width; i++ ) {
		row[i] = this.matrix[bIndex][i] || this.matrix[aIndex][i];
	}

	this.matrix[aIndex] = row;
	this.removeRow(bIndex);

	return this;
}

Matrix.prototype.isArray = function (row) {
	return (Object.prototype.toString.call(row) == "[object Array]");
}

Matrix.prototype.rowSize = function(row) {
	var size = 0
	if (this.isArray(row)) {
		row.forEach(function(c){
			if (c) { size++; }
		});
	} else {
		if (row > this.matrix.length - 1) { return size; }
		for (var i=0; i < this.width; i++) {
			if (this.matrix[row][i]) { size++; }
		}
	}
	return size;
}

Matrix.prototype.maxHeight = function () {
	var size = 0;
	for (var col=0; col < this.width; col++) {
		if (size < this.colSize(col)) { size = col; }
	}
	return size;
}

Matrix.prototype.colSize = function(col) {
	var size = 0;
	for (var i=0; i < this.matrix.length; i++) {
		if (this.matrix[i][col]) {
			size++
		}
	}
	return size;
}

Matrix.prototype.sort = function(sortFn) {
	if (sortFn) { this.sortFn = sortFn; }
	if (!this.sortFn || this.matrix.length < 2) { return this; }

	var clean = false;
	while (!clean) {
		clean = true;
		for (var a=1; a < this.matrix.length; a++) {
			// compare each row to all rows above it
			for (var b=0; b < a; b++) {
				if (this.sortFn(this.matrix[a],this.matrix[b]) == 1) {
					this.swapRows(a,b);
					clean = false;
					break;
				}
			}
		}
	}

	return this;
}

Matrix.prototype.swapRows = function(a,b) {
	var swap = this.matrix[a];
	this.matrix[a] = this.matrix[b];
	this.matrix[b] = swap;
	return
};

Matrix.prototype.packUp = function() {
	if (this.matrix.length < 2) { return this; }

	var clean = false;
	while (!clean) {
		clean = true;
		for (var a=1; a < this.matrix.length; a++) {
			// compare each row to all rows above it
			for (var b=0; b < a; b++) {
				// if the rows don't intersect, merge them & bail
				if (!this.rowsIntersect(a,b)) {
					this.mergeRows(b,a);
					clean = false;
					break;
				}
			}
		}
	}

	return this;
}

Matrix.prototype.mergeAddRow = function(row) {
	for (var a=0; a < this.matrix.length; a++) {
		// if the row doesn't intsersect, merge the row in
		if (!this.rowsIntersect(a,row)) {
			for (var i=0; i < this.width; i++ ) {
				if (row[i]) { this.matrix[a][i] = row[i] }
			}
			return this.matrix.length;
		}
	}

	// otherwise add it
	return this.addRow(row);
}

Matrix.prototype.columnCount = function (col) {
	var count = 0;
	if (col > this.width - 1) { return count; }
	this.matrix.forEach(function(row){ if (row[i]) { count++; } });
	return count;
}


function logMatrix(matrix) {
	var str = "";
	matrix.forEach(function(row){
		str += "    " + row.join(" ") + "\n"
	});
	
	console.log(str);
}

Matrix.prototype.log = function () {
	logMatrix(this.matrix);
	return this;
}

Matrix.prototype.segments = function () {
	var segments = [];
	for (var i=0; i < this.matrix.length; i++) {
		segments = segments.concat(this.rowSegments(this.matrix[i], i));
	}

	return segments;
}

Matrix.prototype.rowSegments = function (row, rowNum) {
	var segments = []
		, segment = { row : rowNum };

	for (var i=0; i < row.length; i++) {
		if (row[i] < 0) {
			// have we encountered an overflow cell?
			// close segment if we have an open one
			if (segment.value) {
				segment.end = i -1;
				segments.push(segment);
				segment = { row : rowNum, start : -1 }
			}

			segments.push({ row : rowNum, start : i, end : i, value : row[i] });
		} else if (!segment.value) {
			// are we starting a new segment?
			if (row[i] != 0) {
				segment.value = row[i]
				segment.start = i;
			}
		} else {
			// if we have a (non-overflow) seg, we're looking for the end.
			if (row[i] == 0) {
				segment.end = i - 1;
				segments.push(segment);
				segment = { row : rowNum }
			} else if (row[i] != segment.value) {
				segment.end = i - 1;
				segments.push(segment);
				segment = { row : rowNum, value : row[i], start : i }
			} else if (i == row.length - 1) {
				segment.end = i;
				segments.push(segment);
			}
		}
	}

	return segments;
}

Matrix.prototype.overflowMatrix = function () {
	// if we don't have enough rows to mess with overflow at all, let's bail
	if (this.matrix.length < this.overflowRow) { 
		return this.matrix;
	}

	var colSizes = new Array(this.width)
		, overflowMatrix = new Array(this.overflowRow);

	// prep overflow matrix of all zeros
	for (var i=0; i < this.overflowRow; i++) {
		var row = new Array(this.width);
		for (var j=0; j < this.width; j++) { row[j] = 0; }
		overflowMatrix[i] = row;
	}

	for (var col=0; col < this.width; col++) {
		// @todo - refactor out this iteration
		colSizes[col] = this.colSize(col);

		for (var row=0; row < overflowMatrix.length; row++) {
			if (row == (this.overflowRow - 1) && colSizes[col] > this.overflowRow) {
				// if we're overflowing, we set a negative number equal to the number of undisplayed cells
				overflowMatrix[row][col] = -(colSizes[col] - (this.overflowRow - 1));
			} else {
				overflowMatrix[row][col] = this.matrix[row][col]
			}
		}
	}

	return overflowMatrix;
}

Matrix.prototype.overflowSegments = function () {
	var segments = []
		, matrix = this.overflowMatrix()

	for (var i=0; i < matrix.length; i++) {
		segments = segments.concat(this.rowSegments(matrix[i], i));
	}

	return segments;
}

module.exports = Matrix;