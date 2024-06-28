import struct

def encode(n):
    """
    while n > 0
        take lowest order 7 bits
        add the correct msb: 1 unless final 7 bits
        push to some sequence of bytes
        reduce n by 7 bits
    return byte sequence
    """
    out = []
    while n >0:
        part = n % 128
        n >>= 7
        if n > 0:
            part |= 0x80
        out.append(part)
    return bytes(out)

def decode(varn):
    """
    for b in varn in reverse order:
        - shift accumulator left 7
        - discard msb
        - accumulate b
    """
    n = 0
    for b in reversed(varn):
        n <<= 7
        n |= (b & 0x7f)
    return n

if __name__ == '__main__':
    cases = (
        ('1.uint64', b'\x01'),
        ('150.uint64', b'\x96\x01'),
        ('maxint.uint64', b'\xff\xff\xff\xff\xff\xff\xff\xff\xff\x01'),
    )
    for fname, expectation in cases:
        with open(fname, 'rb') as f:
            n = struct.unpack('>Q', f.read())[0]
            assert encode(n) == expectation
            assert decode(encode(n)) == n
    print('ok')
